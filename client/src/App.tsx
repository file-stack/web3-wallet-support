import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { ThemeContext } from "@/lib/theme-context";
import { ThemeToggle } from "@/components/theme-toggle";
import Home from "@/pages/home";
import CryptoIssues from "@/pages/crypto-issues";
import NotFound from "@/pages/not-found";
import { Zap, Wallet, BarChart3 } from "lucide-react";
import { Link, useLocation } from "wouter";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/crypto-issues" component={CryptoIssues} />
      <Route component={NotFound} />
    </Switch>
  );
}

function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="w-full border-b border-border/30 bg-background/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <Wallet className="w-6 h-6 text-primary" />
              <h1 className="text-lg font-bold text-foreground" data-testid="text-app-title">
                Web3 Wallet
              </h1>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-8">
              <a href="#docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Docs
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </a>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Navigation />
            <main className="flex-1 overflow-auto">
              <Router />
            </main>
            <footer className="border-t border-border/30 bg-background/50 mt-24">
              <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                  <div>
                    <h3 className="font-semibold mb-4 text-foreground">Web3 Wallet</h3>
                    <p className="text-sm text-muted-foreground">Unified support for 114+ cryptocurrency wallets.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4 text-foreground text-sm">Product</h4>
                    <ul className="space-y-3 text-sm">
                      <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Wallets</a></li>
                      <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
                      <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4 text-foreground text-sm">Resources</h4>
                    <ul className="space-y-3 text-sm">
                      <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
                      <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Security</a></li>
                      <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4 text-foreground text-sm">Company</h4>
                    <ul className="space-y-3 text-sm">
                      <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
                      <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
                      <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Community</a></li>
                    </ul>
                  </div>
                </div>
                <div className="border-t border-border/30 mt-12 pt-8 text-center text-sm text-muted-foreground">
                  <p>© 2024 Web3 Wallet Support. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
