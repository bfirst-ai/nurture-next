import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check, ArrowRight, ShieldAlert, FileSearch, FileText, Calculator, Building2 } from "lucide-react";
import { motion } from "framer-motion";

const servicesData = [
  {
    id: "itr",
    category: "Tax",
    icon: FileText,
    title: "Income Tax Filing",
    description: "End-to-end filing for salaried employees, freelancers, traders, and businesses.",
    price: "₹999",
    features: [
      "ITR-1 to ITR-6 covered",
      "Dedicated CA assigned",
      "Capital gains & crypto computation",
      "Foreign income reporting (DTAA)"
    ]
  },
  {
    id: "gst",
    category: "GST",
    icon: Calculator,
    title: "GST Filing & Compliance",
    description: "Seamless monthly returns and strict compliance for businesses of all sizes.",
    price: "₹1,499",
    features: [
      "New GST Registration",
      "Monthly/Quarterly returns filing",
      "Input Tax Credit (ITC) reconciliation",
      "Annual Return (GSTR-9) preparation"
    ]
  },
  {
    id: "business",
    category: "Business",
    icon: Building2,
    title: "Business Registration",
    description: "Incorporate your startup correctly from day one with all legal compliance.",
    price: "₹2,999",
    features: [
      "Pvt Ltd / LLP / OPC incorporation",
      "DSC & DIN for Directors",
      "PAN, TAN & Bank Account setup",
      "Initial compliance setup"
    ]
  },
  {
    id: "notice",
    category: "Legal",
    icon: ShieldAlert,
    title: "Notice Handling",
    description: "Expert representation for Income Tax or GST notices.",
    price: "Custom",
    features: [
      "Detailed analysis of notice",
      "Drafting legal and factual response",
      "Representation before tax officer",
      "Appeals and litigation support"
    ]
  },
  {
    id: "review",
    category: "Tax",
    icon: FileSearch,
    title: "Document Review",
    description: "A quick health-check of your tax documents before you file.",
    price: "₹499",
    features: [
      "Review of Form 16 & salary slips",
      "Investment proof verification",
      "Deduction optimization analysis",
      "Checklist output provided"
    ]
  }
];

const tabs = ["All", "Tax", "GST", "Business", "Legal"];

export default function Services() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredServices = servicesData.filter(s => activeTab === "All" || s.category === activeTab);

  return (
    <div className="w-full bg-background min-h-screen pb-24">
      {/* ── Dark minimal hero ── */}
      <div className="bg-navy py-24 md:py-32 relative overflow-hidden">
        <div className="grain-overlay absolute inset-0 z-0"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
          <div className="text-gold text-sm font-medium mb-4 uppercase tracking-widest">Nurture Next Offerings</div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6">Expertise delivered.</h1>
          <div className="gold-rule mx-auto my-6 w-24" />
          <p className="text-xl text-white/80 leading-relaxed">
            Transparent pricing. Expert execution. Choose the service you need and leave the complexity to us.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        {/* ── Filter Tabs ── */}
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

        {/* ── Service Cards ── */}
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
                  {service.price} {service.price !== "Custom" && <span className="font-normal opacity-80 text-xs">onwards</span>}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-3 font-display">{service.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed mb-8 min-h-[3rem]">{service.description}</p>
              
              <div className="bg-muted/30 rounded-2xl p-6 mb-8 flex-grow">
                <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wide">What's included</h4>
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
