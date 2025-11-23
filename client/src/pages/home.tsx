import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const WALLETS = [
  { id: "metamask", name: "MetaMask", logo: "https://cryptologos.cc/logos/metamask-logo.png", url: "https://metamask.io/" },
  { id: "trust", name: "Trust Wallet", logo: "https://cryptologos.cc/logos/trust-wallet-logo.png", url: "https://trustwallet.com/" },
  { id: "coinbase", name: "Coinbase Wallet", logo: "https://cryptologos.cc/logos/coinbase-logo.png", url: "https://wallet.coinbase.com/" },
  { id: "ledger", name: "Ledger", logo: "https://cryptologos.cc/logos/ledger-logo.png", url: "https://www.ledger.com/" },
  { id: "trezor", name: "Trezor", logo: "https://cryptologos.cc/logos/trezor-logo.png", url: "https://trezor.io/" },
  { id: "phantom", name: "Phantom", logo: "https://cryptologos.cc/logos/phantom-logo.png", url: "https://phantom.app/" },
  { id: "rainbow", name: "Rainbow", logo: "https://cryptologos.cc/logos/rainbow-logo.png", url: "https://rainbow.me/" },
  { id: "exodus", name: "Exodus", logo: "https://cryptologos.cc/logos/exodus-logo.png", url: "https://www.exodus.com/" },
  { id: "argent", name: "Argent", logo: "https://cryptologos.cc/logos/argent-logo.png", url: "https://www.argent.xyz/" },
  { id: "safepal", name: "SafePal", logo: "https://cryptologos.cc/logos/safepal-logo.png", url: "https://safepal.com/" },
  { id: "imtoken", name: "imToken", logo: "https://cryptologos.cc/logos/imtoken-logo.png", url: "https://token.im/" },
  { id: "coinomi", name: "Coinomi", logo: "https://cryptologos.cc/logos/coinomi-logo.png", url: "https://coinomi.com/" },
  { id: "electrum", name: "Electrum", logo: "https://cryptologos.cc/logos/electrum-erc-logo.png", url: "https://electrum.org/" },
  { id: "bluewallet", name: "BlueWallet", logo: "https://cryptologos.cc/logos/bluewallet-logo.png", url: "https://bluewallet.io/" },
  { id: "myetherwallet", name: "MyEtherWallet", logo: "https://cryptologos.cc/logos/myetherwallet-logo.png", url: "https://www.myetherwallet.com/" },
  { id: "mycrypto", name: "MyCrypto", logo: "https://cryptologos.cc/logos/mycrypto-logo.png", url: "https://mycrypto.com/" },
  { id: "solflare", name: "Solflare", logo: "https://cryptologos.cc/logos/solflare-logo.png", url: "https://solflare.com/" },
  { id: "ledger-live", name: "Ledger Live", logo: "https://cryptologos.cc/logos/ledger-logo.png", url: "https://www.ledger.com/ledger-live" },
  { id: "walletconnect", name: "WalletConnect", logo: "https://cryptologos.cc/logos/walletconnect-logo.png", url: "https://walletconnect.com/" },
  { id: "brave", name: "Brave Wallet", logo: "https://cryptologos.cc/logos/brave-bat-logo.png", url: "https://brave.com/crypto/" },
  { id: "keplr", name: "Keplr", logo: "https://cryptologos.cc/logos/keplr-logo.png", url: "https://www.keplr.app/" },
  { id: "zerion", name: "Zerion", logo: "https://cryptologos.cc/logos/zerion-logo.png", url: "https://zerion.io/" },
  { id: "okx", name: "OKX Wallet", logo: "https://cryptologos.cc/logos/okx-okb-logo.png", url: "https://www.okx.com/web3" },
  { id: "kraken", name: "Kraken", logo: "https://cryptologos.cc/logos/kraken-logo.png", url: "https://www.kraken.com/" },
  { id: "binance", name: "Binance", logo: "https://cryptologos.cc/logos/binance-bnb-logo.png", url: "https://www.binance.com/" },
  { id: "cryptocom", name: "Crypto.com", logo: "https://cryptologos.cc/logos/crypto-com-logo.png", url: "https://crypto.com/defi-wallet" },
  { id: "atomic", name: "Atomic Wallet", logo: "https://cryptologos.cc/logos/atomic-wallet-logo.png", url: "https://atomicwallet.io/" },
  { id: "edge", name: "Edge Wallet", logo: "https://cryptologos.cc/logos/edge-logo.png", url: "https://edge.app/" },
  { id: "guarda", name: "Guarda Wallet", logo: "https://cryptologos.cc/logos/guarda-logo.png", url: "https://guarda.com/" },
  { id: "zengo", name: "ZenGo", logo: "https://cryptologos.cc/logos/zengo-logo.png", url: "https://zengo.com/" },
  { id: "blockchain", name: "Blockchain.com", logo: "https://cryptologos.cc/logos/blockchain-logo.png", url: "https://www.blockchain.com/wallet" },
  { id: "bitget", name: "Bitget Wallet", logo: "https://cryptologos.cc/logos/bitget-bitget-logo.png", url: "https://web3.bitget.com/" },
  { id: "mathwallet", name: "MathWallet", logo: "https://cryptologos.cc/logos/mathwallet-logo.png", url: "https://mathwallet.org/" },
  { id: "tokenpocket", name: "TokenPocket", logo: "https://cryptologos.cc/logos/tokenpocket-logo.png", url: "https://www.tokenpocket.pro/" },
  { id: "oneinch", name: "1inch Wallet", logo: "https://cryptologos.cc/logos/1inch-1inch-logo.png", url: "https://1inch.io/wallet/" },
  { id: "uniswap", name: "Uniswap Wallet", logo: "https://cryptologos.cc/logos/uniswap-uni-logo.png", url: "https://wallet.uniswap.org/" },
  { id: "rabby", name: "Rabby Wallet", logo: "https://cryptologos.cc/logos/rabby-logo.png", url: "https://rabby.io/" },
  { id: "frame", name: "Frame", logo: "https://cryptologos.cc/logos/frame-logo.png", url: "https://frame.sh/" },
  { id: "taho", name: "Taho", logo: "https://cryptologos.cc/logos/taho-logo.png", url: "https://taho.xyz/" },
  { id: "alpha", name: "Alpha Wallet", logo: "https://cryptologos.cc/logos/alphawallet-logo.png", url: "https://alphawallet.com/" },
  { id: "onto", name: "ONTO Wallet", logo: "https://cryptologos.cc/logos/onto-logo.png", url: "https://onto.app/" },
  { id: "unstoppable", name: "Unstoppable", logo: "https://cryptologos.cc/logos/unstoppable-domains-logo.png", url: "https://unstoppable.money/" },
  { id: "ambire", name: "Ambire Wallet", logo: "https://cryptologos.cc/logos/ambire-logo.png", url: "https://www.ambire.com/" },
  { id: "coin98", name: "Coin98 Wallet", logo: "https://cryptologos.cc/logos/coin98-logo.png", url: "https://coin98.com/" },
  { id: "slope", name: "Slope Wallet", logo: "https://cryptologos.cc/logos/slope-logo.png", url: "https://slope.finance/" },
  { id: "glow", name: "Glow Wallet", logo: "https://cryptologos.cc/logos/glow-logo.png", url: "https://glow.app/" },
  { id: "klever", name: "Klever Wallet", logo: "https://cryptologos.cc/logos/klever-klv-logo.png", url: "https://klever.io/" }
];

function WalletCard({ wallet, index, prefersReducedMotion }: { wallet: typeof WALLETS[0], index: number, prefersReducedMotion: boolean }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(wallet.logo);

  const handleImageError = () => {
    // Retry with a different approach or cache buster
    if (imageSrc === wallet.logo) {
      setImageSrc(`${wallet.logo}?t=${Date.now()}`);
    } else {
      // If retried and still failing, show fallback
      setImageLoaded(true);
    }
  };

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
          <img
            src={imageSrc}
            alt={`${wallet.name} logo`}
            className={`h-16 w-16 md:h-20 md:w-20 object-contain transition-all duration-300 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-100 scale-100'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
            loading="eager"
            decoding="sync"
            crossOrigin="anonymous"
            data-testid={`img-wallet-logo-${wallet.id}`}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 md:h-20 md:w-20 rounded-xl bg-gradient-to-br from-muted/50 to-muted animate-pulse" />
            </div>
          )}
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

export default function Home() {
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
      
      <div className="relative z-10 px-6 py-12 md:px-8 md:py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <h1 
              className="font-bold text-3xl md:text-4xl mb-4 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent"
              data-testid="text-page-title"
            >
              choose wallet type
            </h1>
            <p 
              className="text-lg font-normal text-foreground/70 max-w-2xl mx-auto"
              data-testid="text-page-subtitle"
            >
              Connect your preferred wallet to get started
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
