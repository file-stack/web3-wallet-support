import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Wallet, Coins, Lock, Shield, Key, Zap, DollarSign, 
  Smartphone, HardDrive, Settings, Eye, LogIn,
  CreditCard, Database, Radio, Gem, Anchor, ChevronRight,
  Package, Cpu, Grid, Hexagon, Hash, Layers, Activity,
  Network, Link2, Unlock, Cloud, BookOpen, Code, BarChart3,
  Globe, ArrowRightLeft
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  metamask: Wallet,
  trust: Shield,
  coinbase: CreditCard,
  ledger: HardDrive,
  trezor: HardDrive,
  phantom: Lock,
  rainbow: Gem,
  exodus: Package,
  argent: Shield,
  safepal: Lock,
  imtoken: Smartphone,
  coinomi: Wallet,
  electrum: Zap,
  bluewallet: Smartphone,
  myetherwallet: Globe,
  mycrypto: Cpu,
  solflare: Zap,
  "ledger-live": Database,
  walletconnect: Link2,
  brave: Shield,
  keplr: Anchor,
  zerion: Grid,
  okx: Hash,
  kraken: Radio,
  binance: Coins,
  cryptocom: DollarSign,
  atomic: Layers,
  edge: Activity,
  guarda: Wallet,
  zengo: Key,
  blockchain: Hexagon,
  bitget: Zap,
  mathwallet: Cpu,
  tokenpocket: Smartphone,
  oneinch: Network,
  uniswap: ArrowRightLeft,
  rabby: Wallet,
  frame: Settings,
  taho: Eye,
  alpha: ChevronRight,
  onto: LogIn,
  unstoppable: Unlock,
  ambire: Cloud,
  coin98: BookOpen,
  slope: Code,
  glow: BarChart3,
  klever: Gem,
};

const WALLETS = [
  { id: "metamask", name: "MetaMask", url: "https://metamask.io/" },
  { id: "trust", name: "Trust Wallet", url: "https://trustwallet.com/" },
  { id: "coinbase", name: "Coinbase Wallet", url: "https://wallet.coinbase.com/" },
  { id: "ledger", name: "Ledger", url: "https://www.ledger.com/" },
  { id: "trezor", name: "Trezor", url: "https://trezor.io/" },
  { id: "phantom", name: "Phantom", url: "https://phantom.app/" },
  { id: "rainbow", name: "Rainbow", url: "https://rainbow.me/" },
  { id: "exodus", name: "Exodus", url: "https://www.exodus.com/" },
  { id: "argent", name: "Argent", url: "https://www.argent.xyz/" },
  { id: "safepal", name: "SafePal", url: "https://safepal.com/" },
  { id: "imtoken", name: "imToken", url: "https://token.im/" },
  { id: "coinomi", name: "Coinomi", url: "https://coinomi.com/" },
  { id: "electrum", name: "Electrum", url: "https://electrum.org/" },
  { id: "bluewallet", name: "BlueWallet", url: "https://bluewallet.io/" },
  { id: "myetherwallet", name: "MyEtherWallet", url: "https://www.myetherwallet.com/" },
  { id: "mycrypto", name: "MyCrypto", url: "https://mycrypto.com/" },
  { id: "solflare", name: "Solflare", url: "https://solflare.com/" },
  { id: "ledger-live", name: "Ledger Live", url: "https://www.ledger.com/ledger-live" },
  { id: "walletconnect", name: "WalletConnect", url: "https://walletconnect.com/" },
  { id: "brave", name: "Brave Wallet", url: "https://brave.com/crypto/" },
  { id: "keplr", name: "Keplr", url: "https://www.keplr.app/" },
  { id: "zerion", name: "Zerion", url: "https://zerion.io/" },
  { id: "okx", name: "OKX Wallet", url: "https://www.okx.com/web3" },
  { id: "kraken", name: "Kraken", url: "https://www.kraken.com/" },
  { id: "binance", name: "Binance", url: "https://www.binance.com/" },
  { id: "cryptocom", name: "Crypto.com", url: "https://crypto.com/defi-wallet" },
  { id: "atomic", name: "Atomic Wallet", url: "https://atomicwallet.io/" },
  { id: "edge", name: "Edge Wallet", url: "https://edge.app/" },
  { id: "guarda", name: "Guarda Wallet", url: "https://guarda.com/" },
  { id: "zengo", name: "ZenGo", url: "https://zengo.com/" },
  { id: "blockchain", name: "Blockchain.com", url: "https://www.blockchain.com/wallet" },
  { id: "bitget", name: "Bitget Wallet", url: "https://web3.bitget.com/" },
  { id: "mathwallet", name: "MathWallet", url: "https://mathwallet.org/" },
  { id: "tokenpocket", name: "TokenPocket", url: "https://www.tokenpocket.pro/" },
  { id: "oneinch", name: "1inch Wallet", url: "https://1inch.io/wallet/" },
  { id: "uniswap", name: "Uniswap Wallet", url: "https://wallet.uniswap.org/" },
  { id: "rabby", name: "Rabby Wallet", url: "https://rabby.io/" },
  { id: "frame", name: "Frame", url: "https://frame.sh/" },
  { id: "taho", name: "Taho", url: "https://taho.xyz/" },
  { id: "alpha", name: "Alpha Wallet", url: "https://alphawallet.com/" },
  { id: "onto", name: "ONTO Wallet", url: "https://onto.app/" },
  { id: "unstoppable", name: "Unstoppable", url: "https://unstoppable.money/" },
  { id: "ambire", name: "Ambire Wallet", url: "https://www.ambire.com/" },
  { id: "coin98", name: "Coin98 Wallet", url: "https://coin98.com/" },
  { id: "slope", name: "Slope Wallet", url: "https://slope.finance/" },
  { id: "glow", name: "Glow Wallet", url: "https://glow.app/" },
  { id: "klever", name: "Klever Wallet", url: "https://klever.io/" }
];

function WalletCard({ wallet, index, prefersReducedMotion }: { wallet: typeof WALLETS[0], index: number, prefersReducedMotion: boolean }) {
  const IconComponent = ICON_MAP[wallet.id] || Wallet;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href="/crypto-issues">
          <motion.div
            aria-label={`Get support for ${wallet.name} wallet`}
            className="group relative flex items-center justify-center aspect-square rounded-2xl p-6 bg-card/60 backdrop-blur-md border border-card-border hover-elevate active-elevate-2 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-ring overflow-visible cursor-pointer"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, delay: index * 0.03 }}
            whileHover={prefersReducedMotion ? {} : { 
              y: -8,
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            data-testid={`link-wallet-${wallet.id}`}
          >
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, delay: index * 0.03 }}
              className="relative z-10"
            >
              <IconComponent 
                className="h-16 w-16 md:h-20 md:w-20 text-primary transition-all duration-300"
                data-testid={`icon-wallet-${wallet.id}`}
              />
            </motion.div>
          </motion.div>
        </Link>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        className="px-3 py-2 text-sm font-medium bg-popover/95 backdrop-blur-sm border-popover-border"
        data-testid={`tooltip-wallet-${wallet.id}`}
      >
        {wallet.name}
      </TooltipContent>
    </Tooltip>
  );
}

export default function HomePage() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

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
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="flex items-center justify-center gap-4 md:gap-8 mb-8 md:mb-12"
            data-testid="hero-images-section"
          >
            <Coins 
              className="h-12 w-12 md:h-16 md:w-16 text-primary opacity-70 hover:opacity-100 transition-opacity" 
              data-testid="icon-coins"
            />
            <Lock 
              className="h-16 w-16 md:h-20 md:w-20 text-accent opacity-70 hover:opacity-100 transition-opacity" 
              data-testid="icon-lock"
            />
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <h1 
              className="font-bold text-4xl md:text-5xl mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight"
              data-testid="text-page-title"
            >
              Select Your Wallet
            </h1>
            <p 
              className="text-xl font-normal text-foreground/70 max-w-2xl mx-auto mb-2"
              data-testid="text-page-subtitle"
            >
              Choose your wallet provider to access secure support and resources
            </p>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Over 47 wallets supported with instant assistance
            </p>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-6">
              {WALLETS.map((wallet, index) => (
                <WalletCard key={wallet.id} wallet={wallet} index={index} prefersReducedMotion={prefersReducedMotion} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Click on any wallet to learn more and get started
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
