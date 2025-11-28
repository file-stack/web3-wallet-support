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
import { Link, useLocation } from "wouter";
import logoUrl from "@assets/image_1764335315432.png";

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

  const isActive = (path: string) => location === path;

  return (
    <nav className="w-full glass-nav sticky top-0 z-50 border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer hover-elevate px-2 py-1 rounded-md transition-all">
              <img src={logoUrl} alt="Web3 Wallet Logo" className="w-9 h-9 object-contain drop-shadow-sm" data-testid="img-app-logo" />
              <div className="flex flex-col">
                <h1 className="text-base font-bold text-foreground leading-none" data-testid="text-app-title">
                  Web3 Wallet
                </h1>
                <span className="text-xs text-primary/70 font-medium">Support</span>
              </div>
            </div>
          </Link>

          {/* Center Navigation */}
          <div className="flex items-center gap-1">
            <Link href="/" className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
              isActive("/") 
                ? "bg-primary/10 text-primary border border-primary/20" 
                : "text-muted-foreground hover:text-foreground hover-elevate"
            }`} data-testid="link-home">
              Wallets
            </Link>
            <Link href="/crypto-issues" className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
              isActive("/crypto-issues") 
                ? "bg-primary/10 text-primary border border-primary/20" 
                : "text-muted-foreground hover:text-foreground hover-elevate"
            }`} data-testid="link-crypto-issues">
              Issues
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
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
            <footer className="glass-footer mt-32 border-t border-primary/10">
              <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
                  {/* Brand Column */}
                  <div className="col-span-2 md:col-span-1">
                    <div className="flex items-center gap-3 mb-6">
                      <img src={logoUrl} alt="Web3 Wallet Logo" className="w-7 h-7 object-contain" data-testid="img-footer-logo" />
                      <div>
                        <h3 className="font-bold text-foreground text-sm">Web3 Wallet</h3>
                        <p className="text-xs text-primary/70">Support</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Unified support for 114+ cryptocurrency wallets. Professional assistance at your fingertips.
                    </p>
                  </div>

                  {/* Product Section */}
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-5 uppercase tracking-wide text-xs">Product</h4>
                    <ul className="space-y-4 text-sm">
                      <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors font-medium">Wallets</Link></li>
                      <li><a href="#features" className="text-muted-foreground hover:text-primary transition-colors font-medium">Features</a></li>
                      <li><a href="#support" className="text-muted-foreground hover:text-primary transition-colors font-medium">Support</a></li>
                    </ul>
                  </div>

                  {/* Resources Section */}
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-5 uppercase tracking-wide text-xs">Resources</h4>
                    <ul className="space-y-4 text-sm">
                      <li><a href="#docs" className="text-muted-foreground hover:text-primary transition-colors font-medium">Documentation</a></li>
                      <li><a href="#faq" className="text-muted-foreground hover:text-primary transition-colors font-medium">FAQ</a></li>
                      <li><a href="#blog" className="text-muted-foreground hover:text-primary transition-colors font-medium">Blog</a></li>
                    </ul>
                  </div>

                  {/* Company Section */}
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-5 uppercase tracking-wide text-xs">Company</h4>
                    <ul className="space-y-4 text-sm">
                      <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors font-medium">About</a></li>
                      <li><Link href="/crypto-issues" className="text-muted-foreground hover:text-primary transition-colors font-medium">Report Issue</Link></li>
                      <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors font-medium">GitHub</a></li>
                    </ul>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-border/20 my-12"></div>

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <p className="text-xs text-muted-foreground text-center md:text-left">
                    © 2024 Web3 Wallet Support. All rights reserved.
                  </p>
                  <div className="flex items-center gap-8">
                    <a href="#privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors font-medium">Privacy</a>
                    <a href="#terms" className="text-xs text-muted-foreground hover:text-primary transition-colors font-medium">Terms</a>
                    <a href="#contact" className="text-xs text-muted-foreground hover:text-primary transition-colors font-medium">Contact</a>
                  </div>
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
