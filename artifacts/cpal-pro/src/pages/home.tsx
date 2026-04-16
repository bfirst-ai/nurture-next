import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  Globe2,
  Landmark,
  Layers3,
  Lock,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const fadeUp: any = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stats = [
  { value: "12,000+", label: "Returns Filed" },
  { value: "98.4%", label: "First-Pass Accuracy" },
  { value: "48 hrs", label: "Average Turnaround" },
  { value: "220+", label: "Verified Advisors" },
];

const services = [
  {
    icon: FileText,
    title: "Income Tax Filing",
    desc: "End-to-end filing for salaried, freelancers, and investors with advisor review.",
    tag: "Starts INR 999",
  },
  {
    icon: Landmark,
    title: "GST Compliance",
    desc: "Monthly and quarterly GST workflows, reconciliations, and filing support.",
    tag: "Starts INR 1499/mo",
  },
  {
    icon: Layers3,
    title: "Business Setup",
    desc: "Pvt Ltd, LLP, and registrations with structured post-incorporation compliance.",
    tag: "Starts INR 2999",
  },
  {
    icon: ShieldCheck,
    title: "Notice Response",
    desc: "Practical drafting and advisor-led representation for tax and GST notices.",
    tag: "Custom pricing",
  },
];

const process = [
  {
    title: "Secure upload",
    desc: "Share your documents in one encrypted workspace.",
  },
  {
    title: "Advisor assignment",
    desc: "We assign a suitable specialist within 24 hours.",
  },
  {
    title: "Review and approvals",
    desc: "You review every draft before filing is submitted.",
  },
  {
    title: "Filing and support",
    desc: "Get acknowledgements and post-filing assistance.",
  },
];

const faqs = [
  {
    q: "How is this different from DIY tax apps?",
    a: "You still get software speed, but every return is reviewed by a certified advisor. This reduces risk and improves tax outcomes.",
  },
  {
    q: "How quickly can my return be filed?",
    a: "Most straightforward filings are completed in 24 to 48 hours after all documents are shared.",
  },
  {
    q: "Can you handle stocks, crypto, and foreign income?",
    a: "Yes. Our team regularly handles capital gains, RSUs, ESOPs, and international income scenarios.",
  },
  {
    q: "Is my financial data secure?",
    a: "Yes. We use encrypted storage and strict access controls with advisor-level auditability.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="w-full">
      <section className="relative overflow-hidden bg-navy text-white pt-24 pb-20 md:pt-30 md:pb-24">
        <div className="grain-overlay absolute inset-0 opacity-60" />
        <div className="absolute -top-28 -left-16 w-80 h-80 rounded-full bg-primary/35 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent/22 blur-3xl" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div>
              <motion.p
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-[hsl(38,31%,87%)]"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                Advisor-led tax platform
              </motion.p>

              <motion.h1
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-5 text-4xl md:text-6xl font-display font-extrabold leading-[1.05] max-w-3xl"
              >
                Premium tax filing that feels effortless.
              </motion.h1>

              <motion.p
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-6 text-lg text-[hsl(38,20%,80%)] max-w-xl leading-relaxed"
              >
                Nurture Next combines advisor expertise with a clean digital workflow so your filing,
                compliance, and follow-up are accurate, fast, and stress-free.
              </motion.p>

              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="mt-9 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-14 px-7 rounded-full text-base font-semibold" asChild>
                  <Link href="/get-started">
                    Start consultation <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-7 rounded-full text-base font-semibold border-white/35 text-white bg-transparent hover:bg-white/10"
                  asChild
                >
                  <Link href="/contact">Talk to an advisor</Link>
                </Button>
              </motion.div>

              <motion.div
                custom={4}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-9 grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {stats.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/16 bg-white/6 p-4">
                    <div className="text-2xl font-bold font-display text-gold">{item.value}</div>
                    <div className="text-xs uppercase tracking-[0.14em] text-white/70 mt-1">{item.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible" className="lg:justify-self-end w-full max-w-md">
              <div className="rounded-3xl border border-white/16 panel-glass p-6 md:p-7 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-white/65">Live case board</p>
                    <h3 className="font-display text-xl font-semibold mt-1">FY 2025-26 filing</h3>
                  </div>
                  <span className="text-xs rounded-full bg-primary/25 text-[hsl(168,90%,75%)] px-3 py-1 font-semibold border border-primary/35">
                    In progress
                  </span>
                </div>

                <div className="space-y-4 text-sm">
                  {[
                    { label: "Documents validated", done: true },
                    { label: "Advisor review", done: true },
                    { label: "Client approval", done: false },
                    { label: "Final filing", done: false },
                  ].map((step, idx) => (
                    <div key={step.label} className="flex items-center justify-between">
                      <span className="text-white/84">{idx + 1}. {step.label}</span>
                      <span className={`text-xs font-semibold ${step.done ? "text-[hsl(168,90%,72%)]" : "text-white/55"}`}>
                        {step.done ? "Done" : "Pending"}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-[62%] bg-gradient-to-r from-primary to-accent" />
                </div>
                <p className="text-xs text-white/65 mt-3">Estimated completion window: next 18-24 hours</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-6 border-y border-border/70 bg-background/70">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap gap-4 items-center justify-between text-sm text-muted-foreground">
            <p className="font-semibold uppercase tracking-[0.14em] text-xs">As seen in</p>
            <div className="flex items-center gap-6 font-semibold">
              <span>Economic Times</span>
              <span>YourStory</span>
              <span>Inc42</span>
              <span>Business Standard</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-sm uppercase tracking-[0.14em] text-teal font-semibold">Core services</p>
              <h2 className="mt-3 text-3xl md:text-5xl font-display font-bold max-w-2xl">
                Everything needed for filing, compliance, and growth.
              </h2>
            </div>
            <Link href="/services" className="text-sm font-semibold text-primary inline-flex items-center gap-2">
              View all services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-3xl border border-border bg-card p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/12 flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground font-semibold">{service.tag}</span>
                </div>
                <h3 className="text-2xl font-display font-semibold">{service.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-card border-y border-border/70">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm uppercase tracking-[0.14em] text-teal font-semibold">How it works</p>
            <h2 className="mt-3 text-3xl md:text-5xl font-display font-bold">A simple four-step experience</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {process.map((step, i) => (
              <motion.div
                key={step.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-2xl border border-border bg-background p-6"
              >
                <div className="w-10 h-10 rounded-full bg-navy text-gold font-bold flex items-center justify-center text-sm mb-4">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <div className="rounded-3xl bg-navy text-white p-8 md:p-10 relative overflow-hidden">
              <div className="absolute -top-10 -right-8 w-40 h-40 rounded-full bg-primary/25 blur-2xl" />
              <p className="text-xs uppercase tracking-[0.18em] text-gold">Why Nurture Next</p>
              <h3 className="mt-4 text-3xl md:text-4xl font-display font-bold leading-tight">
                Advisor expertise with the speed of modern software.
              </h3>

              <div className="mt-8 space-y-5 text-sm">
                <div className="flex items-start gap-3"><Lock className="w-5 h-5 text-gold mt-0.5" /><span>Encrypted document workflows with role-based access.</span></div>
                <div className="flex items-start gap-3"><Clock3 className="w-5 h-5 text-gold mt-0.5" /><span>Fast SLAs and proactive status updates.</span></div>
                <div className="flex items-start gap-3"><Globe2 className="w-5 h-5 text-gold mt-0.5" /><span>Coverage for domestic and cross-border filing needs.</span></div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {[
                {
                  title: "Accuracy by design",
                  text: "Built-in review checkpoints reduce filing errors and rework.",
                  icon: CheckCircle2,
                },
                {
                  title: "Clear pricing",
                  text: "Transparent plans with scoped deliverables and no hidden charges.",
                  icon: TrendingUp,
                },
                {
                  title: "Human support",
                  text: "Message your assigned advisor directly from your dashboard.",
                  icon: Users,
                },
                {
                  title: "Audit ready outputs",
                  text: "Structured documentation with acknowledgements and timelines.",
                  icon: ShieldCheck,
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <item.icon className="w-6 h-6 text-primary" />
                  <h4 className="mt-4 text-xl font-display font-semibold">{item.title}</h4>
                  <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card border-y border-border/70">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-display font-bold">Questions teams ask most</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-2xl border border-border bg-background overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left"
                >
                  <span className="font-semibold pr-3">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === i ? "rotate-180 text-primary" : "text-muted-foreground"}`} />
                </button>
                {openFaq === i && <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-22 bg-navy text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,172,87,0.24),transparent_60%)]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold">Make tax season the easiest part of your year.</h2>
          <p className="mt-5 text-[hsl(38,20%,80%)] text-lg leading-relaxed">
            Start with a quick discovery call and get a filing plan built for your exact income profile.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-14 px-7 rounded-full text-base font-semibold" asChild>
              <Link href="/get-started">Get started</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-7 rounded-full text-base font-semibold border-white/35 text-white bg-transparent hover:bg-white/10"
              asChild
            >
              <Link href="/contact">Contact sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
