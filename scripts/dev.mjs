import { spawn } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';

const rootDir = process.cwd();
const apiDir = path.join(rootDir, 'artifacts', 'api-server');
const webDir = path.join(rootDir, 'artifacts', 'cpal-pro');

const jobs = [
  {
    name: 'api',
    command: `pnpm --dir "${apiDir}" run build && pnpm --dir "${apiDir}" run start`,
    env: {
      ...process.env,
      PORT: process.env.API_PORT || '3000',
      NODE_ENV: process.env.NODE_ENV || 'development',
    },
  },
  {
    name: 'web',
    command: `pnpm --dir "${webDir}" run dev`,
    env: {
      ...process.env,
      PORT: process.env.WEB_PORT || process.env.PORT || '5173',
      BASE_PATH: process.env.BASE_PATH || '/',
      NODE_ENV: process.env.NODE_ENV || 'development',
    },
  },
];

const children = [];
let shuttingDown = false;

function prefixedLog(name, data) {
  const text = data.toString();
  const lines = text.split(/\r?\n/);
  for (const line of lines) {
    if (!line) continue;
    process.stdout.write(`[${name}] ${line}\n`);
  }
}

function killAll() {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) {
    if (!child.killed) child.kill('SIGINT');
  }
  setTimeout(() => {
    for (const child of children) {
      if (!child.killed) child.kill('SIGTERM');
    }
  }, 1200);
}

for (const job of jobs) {
  const child = spawn(job.command, {
    cwd: rootDir,
    env: job.env,
    shell: true,
    stdio: ['inherit', 'pipe', 'pipe'],
  });

  child.stdout.on('data', (d) => prefixedLog(job.name, d));
  child.stderr.on('data', (d) => prefixedLog(job.name, d));

  child.on('exit', (code) => {
    if (!shuttingDown && code !== 0) {
      process.stderr.write(`[${job.name}] exited with code ${code}. Stopping all services.\n`);
      killAll();
      process.exitCode = code ?? 1;
    }
  });

  children.push(child);
}

process.on('SIGINT', () => {
  killAll();
  setTimeout(() => process.exit(0), 1500);
});

process.on('SIGTERM', () => {
  killAll();
  setTimeout(() => process.exit(0), 1500);
});
