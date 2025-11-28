import { useState } from "react";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, AlertCircle, CheckCircle, Send, Wallet as WalletIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const issueFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  walletAddress: z.string().optional(),
  issueType: z.string().min(1, "Please select an issue type"),
  issueDescription: z.string().min(10, "Description must be at least 10 characters"),
});

export default function CryptoIssues() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [selectedIssue, setSelectedIssue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof issueFormSchema>>({
    resolver: zodResolver(issueFormSchema),
    defaultValues: {
      name: "",
      email: "",
      walletAddress: "",
      issueType: "",
      issueDescription: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof issueFormSchema>) => {
    setIsSubmitting(true);
    try {
      // Find the issue title for better formatting
      const issueTitle = COMMON_ISSUES.find(i => i.id === values.issueType)?.title || values.issueType;
      
      const response = await apiRequest("POST", "/api/submit-issue", {
        name: values.name,
        email: values.email,
        walletAddress: values.walletAddress || "Not provided",
        issueType: issueTitle,
        issueDescription: values.issueDescription,
      });

      toast({
        title: "Issue Submitted Successfully",
        description: "Our support team will review your case and get back to you within 24-48 hours.",
      });

      form.reset();
      setSelectedIssue("");
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Error",
        description: error instanceof Error ? error.message : "Failed to submit your issue. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
              className="mb-6"
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
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your name"
                                data-testid="input-name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your.email@example.com"
                                data-testid="input-email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="walletAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Wallet Address (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="0x..."
                                data-testid="input-wallet-address"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="issueType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Issue Type</FormLabel>
                            <Select 
                              value={field.value} 
                              onValueChange={(value) => {
                                field.onChange(value);
                                setSelectedIssue(value);
                              }}
                            >
                              <FormControl>
                                <SelectTrigger data-testid="select-issue-type">
                                  <SelectValue placeholder="Select issue type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {COMMON_ISSUES.map((issue) => (
                                  <SelectItem key={issue.id} value={issue.id}>
                                    {issue.title}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="issueDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Issue Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe your issue in detail..."
                                className="min-h-[120px]"
                                data-testid="textarea-description"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Separator />

                      <Button 
                        type="submit" 
                        className="w-full"
                        data-testid="button-submit-issue"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Submit Issue
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
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
