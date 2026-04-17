import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check, ArrowRight, ShieldAlert, FileSearch, FileText, Calculator, Building2 } from "lucide-react";
import { motion } from "framer-motion";

const servicesData = [
  {
    id: "individual-tax",
    category: "Tax",
    icon: FileText,
    title: "Individual & Business Tax Returns",
    description: "End-to-end federal and state filing for employees, contractors, investors, and business owners.",
    price: "$149",
    features: [
      "1040, Schedule C, and small business return support",
      "Dedicated CPA assigned",
      "Capital gains and crypto tax computation",
      "State filings and extension support"
    ]
  },
  {
    id: "sales-tax",
    category: "Sales Tax",
    icon: Calculator,
    title: "Sales Tax Filing & Compliance",
    description: "Multi-state sales tax setup, filing, and reconciliation for growing businesses.",
    price: "$199/mo",
    features: [
      "State sales tax account registration",
      "Monthly or quarterly return filing",
      "Nexus tracking and liability reconciliation",
      "Audit-ready filing documentation"
    ]
  },
  {
    id: "entity-setup",
    category: "Business",
    icon: Building2,
    title: "Business Entity Setup",
    description: "Set up your LLC or corporation correctly from day one with clean financial controls.",
    price: "$299",
    features: [
      "LLC or corporation formation support",
      "EIN registration and state account setup",
      "Business banking and bookkeeping kickoff checklist",
      "Initial compliance calendar setup"
    ]
  },
  {
    id: "notice",
    category: "Advisory",
    icon: ShieldAlert,
    title: "IRS & State Notice Handling",
    description: "Expert response drafting and representation for IRS and state tax notices.",
    price: "Custom",
    features: [
      "Detailed notice analysis",
      "Legal and factual response drafting",
      "CPA representation during correspondence",
      "Appeal strategy support"
    ]
  },
  {
    id: "review",
    category: "Tax",
    icon: FileSearch,
    title: "Pre-Filing Document Review",
    description: "A fast, expert health-check of your tax packet before submission.",
    price: "$99",
    features: [
      "Review of W-2s, 1099s, and brokerage statements",
      "Deduction and credit coverage check",
      "Missing-document risk assessment",
      "Actionable filing checklist delivered"
    ]
  }
];

const tabs = ["All", "Tax", "Sales Tax", "Business", "Advisory"];

export default function Services() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredServices = servicesData.filter(s => activeTab === "All" || s.category === activeTab);

  return (
    <div className="w-full bg-background min-h-screen pb-24">
      <div className="bg-navy py-24 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
          <div className="text-gold text-sm font-medium mb-4 uppercase tracking-widest">Nurture Next Offerings</div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6">Expertise delivered.</h1>
          <div className="gold-rule mx-auto my-6 w-24" />
          <p className="text-xl text-white/80 leading-relaxed">
            Transparent pricing. Expert execution. Choose the service you need and let us handle the complexity.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab
                  ? "bg-primary text-white shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {filteredServices.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col bg-card border border-border rounded-3xl p-8 hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 shadow-sm"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                  <service.icon className="w-7 h-7" />
                </div>
                <div className="bg-accent/10 text-accent font-bold px-4 py-2 rounded-full text-sm">
                  {service.price} {service.price !== "Custom" && <span className="font-normal opacity-80 text-xs">starting</span>}
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-3 font-display">{service.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed mb-8 min-h-[3rem]">{service.description}</p>

              <div className="bg-muted/30 rounded-2xl p-6 mb-8 flex-grow">
                <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wide">What&apos;s included</h4>
                <ul className="space-y-4">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-foreground text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button className="w-full h-14 rounded-xl text-lg font-bold bg-primary hover:bg-primary/90 text-white" asChild>
                <Link href={`/get-started?service=${service.id}`}>
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No services found for this category.
          </div>
        )}
      </div>
    </div>
  );
}
