import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const WALLETS = [
  { id: "metamask", name: "MetaMask", logo: "https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg", url: "https://metamask.io/" },
  { id: "trust", name: "Trust Wallet", logo: "https://trustwallet.com/assets/images/media/assets/TWT.png", url: "https://trustwallet.com/" },
  { id: "coinbase", name: "Coinbase Wallet", logo: "https://avatars.githubusercontent.com/u/1885080?s=200&v=4", url: "https://wallet.coinbase.com/" },
  { id: "ledger", name: "Ledger", logo: "https://www.ledger.com/wp-content/themes/ledger/assets/images/logo.svg", url: "https://www.ledger.com/" },
  { id: "trezor", name: "Trezor", logo: "https://trezor.io/static/images/trezor-logo.svg", url: "https://trezor.io/" },
  { id: "phantom", name: "Phantom", logo: "https://cdn.jsdelivr.net/gh/solana-labs/token-list@main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png", url: "https://phantom.app/" },
  { id: "rainbow", name: "Rainbow", logo: "https://avatars.githubusercontent.com/u/7525956?s=200&v=4", url: "https://rainbow.me/" },
  { id: "exodus", name: "Exodus", logo: "https://www.exodus.com/static/media/exodus_logo.2f9e6bd6.svg", url: "https://www.exodus.com/" },
  { id: "argent", name: "Argent", logo: "https://avatars.githubusercontent.com/u/87418681?s=200&v=4", url: "https://www.argent.xyz/" },
  { id: "safepal", name: "SafePal", logo: "https://safepal.com/images/logo.svg", url: "https://safepal.com/" },
  { id: "imtoken", name: "imToken", logo: "https://token.im/img/logo.6a4ebdc4.svg", url: "https://token.im/" },
  { id: "coinomi", name: "Coinomi", logo: "https://coinomi.com/img/logo.svg", url: "https://coinomi.com/" },
  { id: "electrum", name: "Electrum", logo: "https://electrum.org/img/electrum_logo.svg", url: "https://electrum.org/" },
  { id: "bluewallet", name: "BlueWallet", logo: "https://bluewallet.io/bluewallet-logo.png", url: "https://bluewallet.io/" },
  { id: "myetherwallet", name: "MyEtherWallet", logo: "https://www.myetherwallet.com/img/favicon.png", url: "https://www.myetherwallet.com/" },
  { id: "mycrypto", name: "MyCrypto", logo: "https://raw.githubusercontent.com/MyCryptoHQ/MyCrypto/master/src/assets/images/logo.png", url: "https://mycrypto.com/" },
  { id: "solflare", name: "Solflare", logo: "https://solflare.com/favicon.ico", url: "https://solflare.com/" },
  { id: "ledger-live", name: "Ledger Live", logo: "https://www.ledger.com/wp-content/themes/ledger/assets/images/logo.svg", url: "https://www.ledger.com/ledger-live" },
  { id: "walletconnect", name: "WalletConnect", logo: "https://walletconnect.com/walletconnect-logo.svg", url: "https://walletconnect.com/" },
  { id: "brave", name: "Brave Wallet", logo: "https://brave.com/static-assets/images/brave-logo.svg", url: "https://brave.com/crypto/" },
  { id: "keplr", name: "Keplr", logo: "https://avatars.githubusercontent.com/u/95957962?s=200&v=4", url: "https://www.keplr.app/" },
  { id: "zerion", name: "Zerion", logo: "https://avatars.githubusercontent.com/u/60892095?s=200&v=4", url: "https://zerion.io/" },
  { id: "okx", name: "OKX Wallet", logo: "https://static.okx.com/cdn/assets/imgs/221/7F4FBC680D1C1B54.png", url: "https://www.okx.com/web3" },
  { id: "kraken", name: "Kraken", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Kraken_logo.png", url: "https://www.kraken.com/" },
  { id: "binance", name: "Binance Wallet", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Binance_Logo.svg", url: "https://www.binance.com/" },
  { id: "cryptocom", name: "Crypto.com DeFi", logo: "https://crypto.com/favicon.ico", url: "https://crypto.com/defi-wallet" },
  { id: "atomic", name: "Atomic Wallet", logo: "https://atomicwallet.io/favicon.ico", url: "https://atomicwallet.io/" },
  { id: "edge", name: "Edge Wallet", logo: "https://edge.app/favicon.ico", url: "https://edge.app/" },
  { id: "guarda", name: "Guarda Wallet", logo: "https://guarda.com/favicon.ico", url: "https://guarda.com/" },
  { id: "zengo", name: "ZenGo", logo: "https://zengo.com/favicon.ico", url: "https://zengo.com/" },
  { id: "blockchain", name: "Blockchain.com", logo: "https://www.blockchain.com/favicon.ico", url: "https://www.blockchain.com/wallet" },
  { id: "bitget", name: "Bitget Wallet", logo: "https://img.bitgetimg.com/favicon.ico", url: "https://web3.bitget.com/" },
  { id: "mathwallet", name: "MathWallet", logo: "https://mathwallet.org/favicon.ico", url: "https://mathwallet.org/" },
  { id: "tokenpocket", name: "TokenPocket", logo: "https://www.tokenpocket.pro/favicon.ico", url: "https://www.tokenpocket.pro/" },
  { id: "oneinch", name: "1inch Wallet", logo: "https://1inch.io/favicon.ico", url: "https://1inch.io/wallet/" },
  { id: "uniswap", name: "Uniswap Wallet", logo: "https://uniswap.org/favicon.ico", url: "https://wallet.uniswap.org/" },
  { id: "rabby", name: "Rabby Wallet", logo: "https://rabby.io/favicon.ico", url: "https://rabby.io/" },
  { id: "frame", name: "Frame", logo: "https://frame.sh/favicon.ico", url: "https://frame.sh/" },
  { id: "taho", name: "Taho", logo: "https://taho.xyz/favicon.ico", url: "https://taho.xyz/" },
  { id: "alpha", name: "Alpha Wallet", logo: "https://alphawallet.com/favicon.ico", url: "https://alphawallet.com/" },
  { id: "onto", name: "ONTO Wallet", logo: "https://onto.app/favicon.ico", url: "https://onto.app/" },
  { id: "unstoppable", name: "Unstoppable Wallet", logo: "https://unstoppable.money/favicon.ico", url: "https://unstoppable.money/" },
  { id: "ambire", name: "Ambire Wallet", logo: "https://www.ambire.com/favicon.ico", url: "https://www.ambire.com/" },
  { id: "coin98", name: "Coin98 Wallet", logo: "https://coin98.com/favicon.ico", url: "https://coin98.com/" },
  { id: "slope", name: "Slope Wallet", logo: "https://slope.finance/favicon.ico", url: "https://slope.finance/" },
  { id: "glow", name: "Glow Wallet", logo: "https://glow.app/favicon.ico", url: "https://glow.app/" },
  { id: "klever", name: "Klever Wallet", logo: "https://klever.io/favicon.ico", url: "https://klever.io/" }
];

function WalletCard({ wallet, index, prefersReducedMotion }: { wallet: typeof WALLETS[0], index: number, prefersReducedMotion: boolean }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.a
          href={wallet.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${wallet.name} wallet website`}
          className="group relative flex items-center justify-center aspect-square rounded-2xl p-6 bg-card/60 backdrop-blur-md border border-card-border hover-elevate active-elevate-2 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-ring overflow-visible"
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
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 md:h-20 md:w-20 rounded-xl bg-gradient-to-br from-muted/50 to-muted animate-pulse" />
            </div>
          )}
          
          {imageError ? (
            <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
              <Wallet className="h-12 w-12 md:h-16 md:w-16" />
              <span className="text-xs font-medium">{wallet.name}</span>
            </div>
          ) : (
            <img
              src={wallet.logo}
              alt={`${wallet.name} logo`}
              className={`h-16 w-16 md:h-20 md:w-20 object-contain transition-all duration-300 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              loading="lazy"
              data-testid={`img-wallet-logo-${wallet.id}`}
            />
          )}
        </motion.a>
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
