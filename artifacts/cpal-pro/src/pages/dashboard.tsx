import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, MessageSquare, Video, CheckCircle2, AlertCircle, 
  UploadCloud, Settings, LayoutDashboard, Clock, ArrowDownToLine, Trash2
} from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [modalOpen, setModalOpen] = useState(false);
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  const tabs = ["Overview", "Documents", "Messages", "Settings"];

  useEffect(() => {
    const deadline = new Date("2025-07-31T23:59:59");
    const diff = deadline.getTime() - Date.now();
    setDaysLeft(Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24))));
  }, []);

  return (
    <div className="flex-1 w-full bg-background pb-20">
      {/* ── Header ── */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 md:px-6 pt-10 pb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold font-display text-foreground">Client Portal</h1>
              <p className="text-muted-foreground mt-2 font-medium">Welcome back, Rohan. Here's your compliance status.</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <Button variant="outline" className="rounded-xl flex-1 md:flex-none border-border" onClick={() => setModalOpen(true)}>
                <MessageSquare className="w-4 h-4 mr-2 text-primary" />
                Contact CPA
              </Button>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="flex space-x-1 mt-8 overflow-x-auto pb-1 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-t-lg font-semibold text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab 
                    ? "bg-primary/10 text-primary border-b-2 border-primary" 
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground border-b-2 border-transparent"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            
            {activeTab === "Overview" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card className="border-border shadow-sm rounded-2xl">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                          <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <Badge variant="outline" className="bg-muted text-foreground text-xs">Tax Season</Badge>
                      </div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Filing Deadline</p>
                      <h3 className="text-xl font-bold text-foreground">July 31, 2025</h3>
                      {daysLeft !== null && (
                        <p className={`text-xs font-semibold mt-1 ${daysLeft <= 30 ? 'text-destructive' : 'text-primary'}`}>
                          {daysLeft > 0 ? `${daysLeft} days left` : "Deadline passed"}
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="border-border shadow-sm rounded-2xl">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/10 border-none text-xs">3 files</Badge>
                      </div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Documents Uploaded</p>
                      <h3 className="text-xl font-bold text-foreground">3 of 5</h3>
                      <p className="text-xs text-muted-foreground mt-1">2 still needed</p>
                    </CardContent>
                  </Card>

                  <Card className="border-border shadow-sm rounded-2xl">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                          <AlertCircle className="w-5 h-5 text-accent" />
                        </div>
                        <Badge className="bg-accent/20 text-accent hover:bg-accent/20 border-none text-xs">1 Pending</Badge>
                      </div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Next Action Required</p>
                      <h3 className="text-base font-bold text-foreground leading-tight">Upload Zerodha statement</h3>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-border shadow-sm rounded-2xl overflow-hidden">
                  <CardHeader className="border-b bg-card pb-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl font-display">FY 2023-24 Income Tax Filing</CardTitle>
                        <CardDescription className="mt-1 text-sm font-medium">Assigned to: CA Priya Sharma</CardDescription>
                      </div>
                      <Badge className="bg-primary text-white hover:bg-primary border-none">In Review</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-10 pb-10 bg-background">
                    {/* Horizontal Progress */}
                    <div className="relative max-w-2xl mx-auto">
                      <div className="absolute top-4 left-0 w-full h-1 bg-muted rounded-full z-0"></div>
                      <div className="absolute top-4 left-0 w-[45%] h-1 bg-primary rounded-full z-0"></div>
                      
                      <div className="flex justify-between relative z-10">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center border-4 border-background shadow-sm">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-bold text-foreground">Submitted</span>
                        </div>
                        {/* Step 2 */}
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center border-4 border-background shadow-sm">
                            <span className="w-3 h-3 rounded-full bg-white"></span>
                          </div>
                          <span className="text-xs font-bold text-primary">In Review</span>
                        </div>
                        {/* Step 3 */}
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-muted border-2 border-border text-muted flex items-center justify-center border-4 border-background">
                          </div>
                          <span className="text-xs font-bold text-muted-foreground">Draft Approval</span>
                        </div>
                        {/* Step 4 */}
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-muted border-2 border-border text-muted flex items-center justify-center border-4 border-background">
                          </div>
                          <span className="text-xs font-bold text-muted-foreground">Filed</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === "Documents" && (
              <Card className="border-border shadow-sm rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between border-b pb-6">
                  <div>
                    <CardTitle className="font-display text-xl">My Documents</CardTitle>
                    <CardDescription>Files shared for compliance.</CardDescription>
                  </div>
                  <Button className="rounded-xl bg-primary text-white hover:bg-primary/90"><UploadCloud className="w-4 h-4 mr-2" /> Upload New</Button>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y border-border">
                    {[
                      { name: "Form_16_TCS.pdf", type: "Tax Form", date: "Oct 12", status: "Verified", color: "text-primary bg-primary/10" },
                      { name: "HDFC_Bank_Statement.pdf", type: "Bank Rec", date: "Oct 12", status: "Verified", color: "text-primary bg-primary/10" },
                      { name: "ELSS_Investments.pdf", type: "Proof", date: "Oct 12", status: "Pending", color: "text-accent bg-accent/10" }
                    ].map((doc, i) => (
                      <div key={i} className="flex items-center justify-between p-5 hover:bg-muted/20 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-muted rounded-xl">
                            <FileText className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-bold text-sm text-foreground">{doc.name}</p>
                            <p className="text-xs text-muted-foreground font-medium mt-0.5">{doc.type} • {doc.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className={`border-none ${doc.color}`}>{doc.status}</Badge>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-lg"><ArrowDownToLine className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive rounded-lg"><Trash2 className="w-4 h-4" /></Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Upload Dropzone */}
                  <div className="m-6 border-2 border-dashed border-border rounded-xl p-8 text-center hover:bg-muted/30 transition-colors cursor-pointer">
                    <UploadCloud className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm font-bold text-foreground">Click to upload or drag & drop</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (max 10MB)</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "Messages" && (
              <Card className="border-border shadow-sm rounded-2xl flex flex-col h-[600px]">
                <CardHeader className="border-b py-4 px-6 bg-card">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">PS</div>
                    <div>
                      <CardTitle className="text-base">CA Priya Sharma</CardTitle>
                      <CardDescription className="text-xs">Typically replies in 2 hours</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-6 overflow-y-auto space-y-6 bg-muted/10">
                  <div className="flex justify-center"><span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">Today, 10:30 AM</span></div>
                  
                  {/* CA Message */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xs shrink-0 mt-1">PS</div>
                    <div className="bg-card border shadow-sm p-4 rounded-2xl rounded-tl-none max-w-[80%]">
                      <p className="text-sm text-foreground">Hi Rohan, I'm reviewing your file. Everything looks good so far. Could you please upload your Zerodha capital gains statement for FY23-24?</p>
                    </div>
                  </div>

                  {/* User Message */}
                  <div className="flex gap-3 justify-end">
                    <div className="bg-primary text-white shadow-sm p-4 rounded-2xl rounded-tr-none max-w-[80%]">
                      <p className="text-sm">Sure Priya, I'll download it from the portal and upload it by evening.</p>
                    </div>
                  </div>

                  {/* CA Message */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xs shrink-0 mt-1">PS</div>
                    <div className="bg-card border shadow-sm p-4 rounded-2xl rounded-tl-none max-w-[80%]">
                      <p className="text-sm text-foreground">Perfect, thanks. Once I have that, I'll prepare the draft computation for your approval.</p>
                    </div>
                  </div>
                </CardContent>
                <div className="p-4 bg-card border-t">
                  <div className="flex gap-2">
                    <input type="text" className="flex-1 bg-muted/50 border-transparent rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Type your message..." />
                    <Button className="rounded-xl bg-primary text-white">Send</Button>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === "Settings" && (
              <div className="bg-card border border-border rounded-2xl p-8 text-center text-muted-foreground">
                <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-bold text-foreground mb-2">Profile Settings</h3>
                <p className="text-sm">Account configuration and notification preferences would appear here.</p>
              </div>
            )}
            
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-border shadow-sm rounded-2xl bg-navy text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2"></div>
              <CardContent className="p-8 relative z-10">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-2xl mb-4 border-2 border-accent/30">
                    PS
                  </div>
                  <h4 className="font-bold text-xl font-display text-white mb-1">CA Priya Sharma</h4>
                  <p className="text-sm font-medium text-white/70 mb-2">Expert: Salaried & Capital Gains</p>
                  <div className="flex items-center gap-1 text-gold text-sm font-bold bg-white/10 px-3 py-1 rounded-full mb-8">
                    ★ 4.9 Rating
                  </div>
                  
                  <div className="w-full space-y-3">
                    <Button className="w-full rounded-xl h-12 font-bold bg-primary text-white hover:bg-primary/90 shadow-lg">
                      <Video className="w-4 h-4 mr-2" /> Join Session
                    </Button>
                    <Button className="w-full rounded-xl h-12 font-bold border-white/20 text-white hover:bg-white/10" variant="outline" onClick={() => setActiveTab("Messages")}>
                      Message Priya
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>

      {/* Simple Contact Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-3xl p-8 max-w-sm w-full border border-border shadow-2xl">
            <h3 className="text-2xl font-bold font-display mb-2 text-foreground">Need help?</h3>
            <p className="text-muted-foreground mb-6">Drop a message to your CPA or reach support directly.</p>
            <Button className="w-full rounded-xl mb-3 h-12 bg-primary text-white font-bold" onClick={() => { setModalOpen(false); setActiveTab("Messages"); }}>Message CPA</Button>
            <Button className="w-full rounded-xl mb-6 h-12 font-bold" variant="outline" asChild><Link href="/contact">Contact Support</Link></Button>
            <Button variant="ghost" className="w-full" onClick={() => setModalOpen(false)}>Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
}