import { useState } from "react";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, AlertCircle, CheckCircle, Send, Wallet as WalletIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const COMMON_ISSUES = [
  { id: "lost-access", title: "Lost Access to Wallet", severity: "high" },
  { id: "forgot-password", title: "Forgot Password/Seed Phrase", severity: "high" },
  { id: "transaction-pending", title: "Transaction Stuck/Pending", severity: "medium" },
  { id: "wrong-network", title: "Sent to Wrong Network", severity: "high" },
  { id: "cant-connect", title: "Can't Connect to DApp", severity: "medium" },
  { id: "high-fees", title: "High Gas Fees", severity: "low" },
  { id: "missing-tokens", title: "Tokens Not Showing", severity: "medium" },
  { id: "scam-suspicious", title: "Scam/Suspicious Activity", severity: "high" },
  { id: "wallet-hacked", title: "Wallet Compromised/Hacked", severity: "critical" },
  { id: "cant-withdraw", title: "Can't Withdraw Funds", severity: "high" },
  { id: "swap-failed", title: "Token Swap Failed", severity: "medium" },
  { id: "nft-issues", title: "NFT Transfer Issues", severity: "medium" }
];

const SOLUTIONS = {
  "lost-access": "Check if you have your recovery phrase saved. Contact the wallet provider's support team immediately.",
  "forgot-password": "Use your 12/24-word recovery phrase to restore your wallet. Never share this with anyone.",
  "transaction-pending": "Check network congestion. You may need to speed up with higher gas fees or wait for confirmation.",
  "wrong-network": "Some assets may be recoverable. Contact support immediately - do NOT attempt random transactions.",
  "cant-connect": "Clear browser cache, check WalletConnect settings, ensure you're on the correct network.",
  "high-fees": "Use gas trackers, transact during off-peak hours, or use Layer 2 solutions.",
  "missing-tokens": "Add token contract address manually, check if you're on the correct network.",
  "scam-suspicious": "Immediately transfer funds to a new wallet. Report to the platform and authorities.",
  "wallet-hacked": "URGENT: Transfer all remaining assets to a new wallet immediately. File a report.",
  "cant-withdraw": "Check minimum withdrawal amounts, verify address format, ensure sufficient gas fees.",
  "swap-failed": "Check slippage settings, ensure sufficient gas, verify token liquidity.",
  "nft-issues": "Verify contract address, check network, ensure NFT standard compatibility (ERC-721/1155)."
};

export default function CryptoIssues() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [selectedIssue, setSelectedIssue] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    walletAddress: "",
    issueDescription: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Issue Submitted Successfully",
      description: "Our support team will review your case and get back to you within 24-48 hours.",
    });

    setFormData({
      name: "",
      email: "",
      walletAddress: "",
      issueDescription: ""
    });
    setSelectedIssue("");
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-destructive";
      case "high": return "text-orange-500";
      case "medium": return "text-yellow-500";
      case "low": return "text-blue-500";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.08) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, hsl(var(--accent) / 0.08) 0%, transparent 50%),
                           radial-gradient(circle at 40% 20%, hsl(var(--primary) / 0.05) 0%, transparent 50%)`
        }}
      />

      <div className="relative z-10 px-6 py-8 md:px-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mb-6 hover-elevate"
              data-testid="button-back-home"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Wallets
            </Button>

            <div className="text-center mb-8">
              <h1 
                className="font-bold text-3xl md:text-4xl mb-4 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent"
                data-testid="text-page-title"
              >
                Crypto Issues Support
              </h1>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Get help with common crypto wallet problems and submit your issues
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-card/60 backdrop-blur-md border-card-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    Common Issues
                  </CardTitle>
                  <CardDescription>
                    Quick solutions for frequent crypto problems
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
                  {COMMON_ISSUES.map((issue) => (
                    <div 
                      key={issue.id}
                      className="p-4 rounded-lg bg-background/50 border border-border hover-elevate cursor-pointer transition-all"
                      onClick={() => setSelectedIssue(issue.id)}
                      data-testid={`card-issue-${issue.id}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium text-sm">{issue.title}</h3>
                        <span className={`text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                          {issue.severity}
                        </span>
                      </div>
                      {selectedIssue === issue.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 pt-3 border-t border-border"
                        >
                          <div className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <p>{SOLUTIONS[issue.id as keyof typeof SOLUTIONS]}</p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-card/60 backdrop-blur-md border-card-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <WalletIcon className="h-5 w-5 text-primary" />
                    Submit Your Issue
                  </CardTitle>
                  <CardDescription>
                    Describe your problem and we'll help you resolve it
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter your name"
                        required
                        data-testid="input-name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your.email@example.com"
                        required
                        data-testid="input-email"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="wallet">Wallet Address (Optional)</Label>
                      <Input
                        id="wallet"
                        value={formData.walletAddress}
                        onChange={(e) => setFormData({...formData, walletAddress: e.target.value})}
                        placeholder="0x..."
                        data-testid="input-wallet-address"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="issue-type">Issue Type</Label>
                      <Select value={selectedIssue} onValueChange={setSelectedIssue}>
                        <SelectTrigger data-testid="select-issue-type">
                          <SelectValue placeholder="Select issue type" />
                        </SelectTrigger>
                        <SelectContent>
                          {COMMON_ISSUES.map((issue) => (
                            <SelectItem key={issue.id} value={issue.id}>
                              {issue.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Issue Description</Label>
                      <Textarea
                        id="description"
                        value={formData.issueDescription}
                        onChange={(e) => setFormData({...formData, issueDescription: e.target.value})}
                        placeholder="Describe your issue in detail..."
                        className="min-h-[120px]"
                        required
                        data-testid="textarea-description"
                      />
                    </div>

                    <Separator />

                    <Button 
                      type="submit" 
                      className="w-full"
                      data-testid="button-submit-issue"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Submit Issue
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-card/60 backdrop-blur-md border-card-border">
              <CardContent className="p-6">
                <div className="text-center text-sm text-muted-foreground">
                  <p className="mb-2">
                    <strong>Security Reminder:</strong> Never share your private keys or seed phrases with anyone, including support staff.
                  </p>
                  <p>
                    Our team will only ask for public wallet addresses and transaction IDs to help resolve your issues.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
