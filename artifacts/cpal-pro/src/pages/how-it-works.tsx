import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { UploadCloud, UserCheck, FileCheck2, CheckCircle2 } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: UploadCloud,
      title: "Upload Documents",
      description: "Drag and drop your W-2s, 1099s, prior-year return, and supporting documents in our secure encrypted portal. Not sure what to upload? We provide a tailored checklist.",
    },
    {
      icon: UserCheck,
      title: "CPA Assignment",
      description: "Based on your tax profile, you are matched with a licensed CPA within 24 hours who specializes in your exact situation.",
    },
    {
      icon: FileCheck2,
      title: "Review & Approve",
      description: "Your assigned CPA prepares your return and shares a draft. Review it, ask questions in chat, or jump on a quick call for clarifications.",
    },
    {
      icon: CheckCircle2,
      title: "Filed & Confirmed",
      description: "Once you approve the draft, we e-file your return and send your IRS and state filing confirmations to your email.",
    }
  ];

  return (
    <div className="w-full bg-background min-h-screen">
      <div className="bg-navy py-24 md:py-32 relative overflow-hidden text-center">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6">Filing, demystified.</h1>
          <div className="gold-rule mx-auto my-6 w-24" />
          <p className="text-xl text-white/80 leading-relaxed">
            No jargon. No confusing forms. Just a simple CPA-led process designed to save you time and reduce tax stress.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-24">
        <div className="max-w-5xl mx-auto relative flex flex-col lg:flex-row gap-16">

          <div className="flex-1 relative">
            <div className="hidden lg:block absolute left-1/2 top-12 bottom-12 w-0.5 bg-accent/40 -translate-x-1/2 z-0"></div>

            <div className="space-y-20 relative z-10">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex flex-col lg:flex-row items-center gap-10 ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
                >
                  <div className={`flex-1 w-full text-center ${index % 2 !== 0 ? "lg:text-left" : "lg:text-right"}`}>
                    <p className={`text-xs font-bold uppercase tracking-widest mb-3 text-accent ${index % 2 !== 0 ? "" : "lg:ml-auto"} inline-block`}>
                      Step {index + 1}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 font-display text-foreground">{step.title}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed max-w-sm inline-block">{step.description}</p>
                  </div>

                  <div className="shrink-0 relative z-10">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-navy border-4 border-background flex items-center justify-center shadow-xl">
                      <span className="text-gold font-bold text-xl font-display">{index + 1}</span>
                    </div>
                  </div>

                  <div className={`flex-1 w-full flex justify-center ${index % 2 !== 0 ? "lg:justify-end" : "lg:justify-start"}`}>
                    <div className={`w-24 h-24 rounded-3xl flex items-center justify-center shadow-sm relative overflow-hidden border ${index === 3 ? "bg-primary/10 border-primary/30" : "bg-card border-border"}`}>
                      <step.icon className="w-10 h-10 text-primary" />
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

          <div className="w-full lg:w-80 shrink-0">
            <div className="sticky top-32 bg-card border border-border rounded-3xl p-8 text-center shadow-lg">
              <h3 className="text-2xl font-bold font-display mb-4 text-foreground">Questions?</h3>
              <p className="text-muted-foreground mb-8">Not sure which plan fits your tax situation? Let our team guide you.</p>
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
