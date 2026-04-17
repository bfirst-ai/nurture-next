import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";
import { UploadCloud, CheckCircle2, FileText, Calculator, Building2, ShieldAlert, MoreHorizontal, ArrowRight, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const servicesList = [
  { id: "individual-tax", icon: FileText, label: "Tax Return Filing" },
  { id: "sales-tax", icon: Calculator, label: "Sales Tax Services" },
  { id: "entity-setup", icon: Building2, label: "Entity Setup" },
  { id: "notice", icon: ShieldAlert, label: "IRS Notice Help" },
  { id: "other", icon: MoreHorizontal, label: "Other" }
];

export default function GetStarted() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedService, setSelectedService] = useState("individual-tax");
  const { toast } = useToast();

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: "Request received!",
      description: "We will contact you within one business day.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="flex-1 w-full bg-background flex items-center justify-center py-20 px-4 min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-card border border-border rounded-3xl p-10 text-center shadow-lg"
        >
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold font-display mb-4 text-foreground">You&apos;re all set!</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            We&apos;ve received your request. A licensed CPA will review your details and reach out shortly.
          </p>
          <Button onClick={() => window.location.href = "/dashboard"} className="w-full h-14 rounded-xl text-lg font-bold">
            Go to Dashboard
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full bg-background py-16">
      <div className="container mx-auto px-4 md:px-6">

        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex justify-between mb-3">
            <span className="text-sm font-bold text-primary">Step {step} of 3</span>
            <span className="text-sm font-medium text-muted-foreground">
              {step === 1 ? "Your Details" : step === 2 ? "Choose Service" : "Upload Documents"}
            </span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 ease-in-out"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto">

          <div className="lg:col-span-7 bg-card border border-border rounded-3xl p-8 md:p-10 shadow-sm">
            <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>

              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <h2 className="text-2xl font-bold font-display mb-8 text-foreground">Tell us about yourself</h2>
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-foreground">Full Name</Label>
                    <Input id="name" required className="h-12 rounded-xl bg-background" placeholder="e.g. Jordan Miller" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-foreground">Email Address</Label>
                    <Input id="email" type="email" required className="h-12 rounded-xl bg-background" placeholder="jordan@example.com" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-input bg-muted text-muted-foreground text-sm font-medium">+1</span>
                      <Input id="phone" type="tel" required className="h-12 rounded-r-xl rounded-l-none bg-background flex-1" placeholder="(555) 123-4567" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="tax-id" className="text-foreground">SSN/ITIN (Last 4 digits, optional)</Label>
                    <Input id="tax-id" className="h-12 rounded-xl bg-background uppercase" placeholder="1234" maxLength={4} />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <h2 className="text-2xl font-bold font-display mb-8 text-foreground">What do you need help with?</h2>
                  <RadioGroup value={selectedService} onValueChange={setSelectedService} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {servicesList.map((srv) => (
                      <div key={srv.id}>
                        <RadioGroupItem value={srv.id} id={srv.id} className="peer sr-only" />
                        <Label
                          htmlFor={srv.id}
                          className="flex flex-col items-center justify-between rounded-2xl border-2 border-muted bg-background p-6 hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                        >
                          <srv.icon className="mb-3 h-8 w-8 text-foreground peer-data-[state=checked]:text-primary" />
                          <span className="font-bold text-foreground">{srv.label}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <h2 className="text-2xl font-bold font-display mb-2 text-foreground">Upload Documents</h2>
                  <p className="text-muted-foreground mb-6">You can skip this and share documents later via your dashboard.</p>

                  <div
                    className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer
                      ${isDragging ? "border-primary bg-primary/5" : "border-white/50 bg-background hover:bg-muted/50"}`}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
                  >
                    <UploadCloud className="w-12 h-12 text-gold mx-auto mb-4" />
                    <h3 className="font-bold text-lg text-foreground mb-2">Drag & drop files</h3>
                    <div className="flex justify-center gap-2 mb-6">
                      <span className="px-2 py-1 bg-muted rounded text-xs font-semibold text-muted-foreground">PDF</span>
                      <span className="px-2 py-1 bg-muted rounded text-xs font-semibold text-muted-foreground">JPG</span>
                      <span className="px-2 py-1 bg-muted rounded text-xs font-semibold text-muted-foreground">PNG</span>
                    </div>
                    <Button type="button" variant="outline" className="rounded-xl font-bold">Browse Files</Button>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="notes" className="text-foreground">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any specific questions or context you want your CPA to know..."
                      className="min-h-[120px] rounded-xl bg-background"
                    />
                  </div>
                </motion.div>
              )}

              <div className="mt-10 pt-6 border-t border-border flex justify-between">
                {step > 1 ? (
                  <Button type="button" variant="ghost" onClick={handleBack} className="text-muted-foreground">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                ) : (<div></div>)}

                <Button type="submit" className="h-12 px-8 rounded-xl font-bold text-white bg-primary hover:bg-primary/90">
                  {step === 3 ? "Submit Request" : <>Continue <ArrowRight className="w-4 h-4 ml-2" /></>}
                </Button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-navy rounded-3xl p-8 text-white h-full shadow-lg relative overflow-hidden">
              <h3 className="text-xl font-bold font-display mb-6 text-gold">Guide</h3>

              {step === 1 && (
                <div className="space-y-4">
                  <p className="text-white/80 leading-relaxed">
                    We need your basic details to create your secure profile. Your data is encrypted and never shared.
                  </p>
                  <ul className="space-y-3 mt-6 text-white/70">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Bank-grade security</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> No spam calls</li>
                  </ul>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <p className="text-white/80 leading-relaxed">
                    Select the primary service you need. If you need multiple services, we will scope everything during your consultation.
                  </p>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h4 className="font-bold text-white mb-2">What to upload for {servicesList.find(s => s.id === selectedService)?.label}:</h4>
                  {selectedService === "individual-tax" && (
                    <ul className="space-y-3 text-white/80 list-disc pl-4 marker:text-gold">
                      <li>W-2 and 1099 forms</li>
                      <li>Last year&apos;s tax return (if available)</li>
                      <li>Brokerage and crypto summaries (if applicable)</li>
                      <li>Deduction records (mortgage interest, donations, etc.)</li>
                    </ul>
                  )}
                  {selectedService === "sales-tax" && (
                    <ul className="space-y-3 text-white/80 list-disc pl-4 marker:text-gold">
                      <li>Sales by state report</li>
                      <li>Marketplace settlement reports</li>
                      <li>Recent sales tax returns</li>
                    </ul>
                  )}
                  {selectedService === "entity-setup" && (
                    <ul className="space-y-3 text-white/80 list-disc pl-4 marker:text-gold">
                      <li>Owner ID (driver&apos;s license or passport)</li>
                      <li>Proposed business name and state</li>
                      <li>Business address and mailing address</li>
                      <li>Ownership breakdown details</li>
                    </ul>
                  )}
                  {['notice', 'other'].includes(selectedService) && (
                    <p className="text-white/80">Upload any IRS/state letters, notices, or relevant documents for CPA review before the call.</p>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
