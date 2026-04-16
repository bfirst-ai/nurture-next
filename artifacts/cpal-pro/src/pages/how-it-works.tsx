import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { UploadCloud, UserCheck, FileCheck2, CheckCircle2, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: UploadCloud,
      title: "Upload Documents",
      description: "Simply drag and drop your Form 16, bank statements, or previous year returns into our secure encrypted portal. Don't know what to upload? We'll provide a tailored checklist.",
    },
    {
      icon: UserCheck,
      title: "CPA Assignment",
      description: "Based on your income profile (salaried, freelancer, capital gains), you are matched with a certified CA within 24 hours who specializes in your exact tax situation.",
    },
    {
      icon: FileCheck2,
      title: "Review & Approve",
      description: "Your assigned CPA prepares your tax computation and shares a draft. Review it, ask questions via chat, or jump on a quick call for clarifications.",
    },
    {
      icon: CheckCircle2,
      title: "Filed & Confirmed",
      description: "Once you approve the draft, we file your return with the Income Tax Department and send you the acknowledgment (ITR-V) immediately to your email.",
    }
  ];

  return (
    <div className="w-full bg-background min-h-screen">
      {/* ── Dark navy hero ── */}
      <div className="bg-navy py-24 md:py-32 relative overflow-hidden text-center">
        <div className="grain-overlay absolute inset-0 z-0"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6">Filing, demystified.</h1>
          <div className="gold-rule mx-auto my-6 w-24" />
          <p className="text-xl text-white/80 leading-relaxed">
            No jargon. No complex forms. Just a seamless process designed to save you time and maximize your returns.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-24">
        <div className="max-w-5xl mx-auto relative flex flex-col lg:flex-row gap-16">
          
          {/* Left/Main Content: Timeline */}
          <div className="flex-1 relative">
            {/* Desktop Gold Connector Line — runs through the center badge column */}
            <div className="hidden lg:block absolute left-1/2 top-12 bottom-12 w-0.5 bg-gradient-to-b from-accent/60 via-accent/30 to-accent/60 -translate-x-1/2 z-0"></div>

            <div className="space-y-20 relative z-10">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex flex-col lg:flex-row items-center gap-10 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                >
                  {/* Text side */}
                  <div className={`flex-1 w-full text-center ${index % 2 !== 0 ? 'lg:text-left' : 'lg:text-right'}`}>
                    <p className={`text-xs font-bold uppercase tracking-widest mb-3 text-accent ${index % 2 !== 0 ? '' : 'lg:ml-auto'} inline-block`}>
                      Step {index + 1}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 font-display text-foreground">{step.title}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed max-w-sm inline-block">{step.description}</p>
                  </div>

                  {/* Center badge */}
                  <div className="shrink-0 relative z-10">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-navy border-4 border-background flex items-center justify-center shadow-xl">
                      <span className="text-gold font-bold text-xl font-display">{index + 1}</span>
                    </div>
                  </div>

                  {/* Icon side */}
                  <div className={`flex-1 w-full flex justify-center ${index % 2 !== 0 ? 'lg:justify-end' : 'lg:justify-start'}`}>
                    <div className={`w-24 h-24 rounded-3xl flex items-center justify-center shadow-sm relative overflow-hidden border ${index === 3 ? 'bg-primary/10 border-primary/30' : 'bg-card border-border'}`}>
                      <step.icon className={`w-10 h-10 ${index === 3 ? 'text-primary' : 'text-primary'}`} />
                      {index === 3 && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                          className="absolute -bottom-1 -right-1 bg-primary rounded-full p-0.5"
                        >
                          <CheckCircle2 className="w-6 h-6 text-white fill-primary" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Sidebar CTA (Desktop sticky) */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="sticky top-32 bg-card border border-border rounded-3xl p-8 text-center shadow-lg">
              <h3 className="text-2xl font-bold font-display mb-4 text-foreground">Questions?</h3>
              <p className="text-muted-foreground mb-8">Not sure which plan suits your situation? Let our experts guide you.</p>
              <Button className="w-full h-12 rounded-xl text-primary border-primary bg-primary/5 hover:bg-primary hover:text-white transition-colors font-bold" variant="outline" asChild>
                <Link href="/contact">Talk to an expert</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}