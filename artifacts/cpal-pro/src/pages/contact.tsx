import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MapPin, Phone, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const days = ["Mon 12", "Tue 13", "Wed 14", "Thu 15", "Fri 16", "Sat 17", "Sun 18"];
  const slots = ["10:00 AM", "12:00 PM", "03:00 PM", "05:00 PM"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDay === null || !selectedSlot) {
      toast({ title: "Select time", description: "Please pick a day and time slot.", variant: "destructive" });
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <div className="w-full bg-background pb-24">
      <div className="bg-card border-b border-border py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Support</p>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-6 text-foreground">Get in touch</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Whether you need a quick tax question answered or full-service CPA support, we&apos;re here to help.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">

          <div>
            <h2 className="text-3xl font-bold mb-8 font-display text-foreground">Send a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="first-name" className="text-foreground">First name</Label>
                  <Input id="first-name" required className="h-12 rounded-xl bg-card" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name" className="text-foreground">Last name</Label>
                  <Input id="last-name" required className="h-12 rounded-xl bg-card" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <Input id="email" type="email" required className="h-12 rounded-xl bg-card" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">Phone</Label>
                  <Input id="phone" type="tel" required className="h-12 rounded-xl bg-card" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Service Required</Label>
                <Select required defaultValue="consultation">
                  <SelectTrigger className="h-12 rounded-xl bg-card">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tax">Tax Return Filing</SelectItem>
                    <SelectItem value="sales-tax">Sales Tax Services</SelectItem>
                    <SelectItem value="entity-setup">Business Entity Setup</SelectItem>
                    <SelectItem value="consultation">General Consultation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-foreground">Message</Label>
                <Textarea id="message" className="min-h-[140px] rounded-xl bg-card" required />
              </div>

              <div className="lg:hidden mt-8">
                <Button type="submit" className="w-full h-14 text-lg font-bold rounded-xl bg-primary text-white">Book Slot & Send</Button>
              </div>
            </form>

            <div className="mt-16 bg-muted/30 border border-border rounded-3xl p-8">
              <h3 className="font-bold text-lg mb-6 font-display">Office Headquarters</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4 text-sm">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-foreground font-medium leading-relaxed">350 Fifth Avenue, Suite 4100<br/>New York, NY 10118</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-foreground font-medium">hello@nurturenext.com</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-foreground font-medium">+1 (212) 555-0147</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-card border border-border rounded-3xl p-8 lg:p-10 shadow-sm sticky top-24">
              <h2 className="text-2xl font-bold mb-2 font-display text-foreground">Pick a slot</h2>
              <p className="text-muted-foreground mb-8">Schedule a free 15-minute discovery call.</p>

              {isSubmitted ? (
                <div className="py-10 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-foreground mb-2">Call Scheduled</h3>
                  <p className="text-muted-foreground">Confirmation sent for {days[selectedDay!]} at {selectedSlot}.</p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <Label className="text-foreground font-bold mb-3 block">Date</Label>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {days.map((day, i) => {
                        const [d, num] = day.split(" ");
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setSelectedDay(i)}
                            className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                              selectedDay === i
                                ? "bg-primary border-primary text-white shadow-md"
                                : "bg-background border-border text-muted-foreground hover:border-primary/40 hover:bg-primary/5"
                            }`}
                          >
                            <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{d}</span>
                            <span className="text-lg font-bold">{num}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mb-10">
                    <Label className="text-foreground font-bold mb-3 block">Time (ET)</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {slots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-3 px-4 rounded-xl text-sm font-bold transition-all border ${
                            selectedSlot === slot
                              ? "bg-primary border-primary text-white shadow-md"
                              : "bg-background border-border text-foreground hover:border-primary/40 hover:bg-primary/5"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleSubmit} className="w-full h-14 text-lg font-bold rounded-xl bg-primary text-white hover:bg-primary/90">
                    Confirm & Schedule
                  </Button>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
