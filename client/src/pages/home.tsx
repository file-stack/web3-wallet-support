import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const WALLETS = [
  { id: "metamask", name: "MetaMask", logo: "https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg", url: "https://metamask.io/" },
  { id: "trust", name: "Trust Wallet", logo: "https://trustwallet.com/assets/images/media/assets/TWT.png", url: "https://trustwallet.com/" },
  { id: "coinbase", name: "Coinbase Wallet", logo: "https://images.ctfassets.net/q5ulk4bp65r7/3TBS4oVkD1ghowTqVQJlqj/d9e3f79ffcc5c9ce5f57b1d31e150ca3/coinbase-icon2.svg", url: "https://wallet.coinbase.com/" },
  { id: "ledger", name: "Ledger", logo: "https://cdn.brandfetch.io/idZAyF9rlg/w/400/h/400/theme/dark/icon.png", url: "https://www.ledger.com/" },
  { id: "trezor", name: "Trezor", logo: "https://trezor.io/content/wysiwyg/Images/Suite/check-verify.png", url: "https://trezor.io/" },
  { id: "phantom", name: "Phantom", logo: "https://pbs.twimg.com/profile_images/1696531511519023104/F0NE35nE_400x400.jpg", url: "https://phantom.app/" },
  { id: "rainbow", name: "Rainbow", logo: "https://avatars.githubusercontent.com/u/48327834?s=200&v=4", url: "https://rainbow.me/" },
  { id: "exodus", name: "Exodus", logo: "https://assets-global.website-files.com/5cec55545d0f47cfe2a39a8e/5e997b6a72e7c46b62c5f4c4_exodus-logo-only.svg", url: "https://www.exodus.com/" },
  { id: "argent", name: "Argent", logo: "https://pbs.twimg.com/profile_images/1721139471948935168/0wqTz6KO_400x400.jpg", url: "https://www.argent.xyz/" },
  { id: "safepal", name: "SafePal", logo: "https://s.safepal.com/static/images/logo.png", url: "https://safepal.com/" },
  { id: "imtoken", name: "imToken", logo: "https://token.im/img/logo.svg", url: "https://token.im/" },
  { id: "coinomi", name: "Coinomi", logo: "https://www.coinomi.com/images/logo.svg", url: "https://coinomi.com/" },
  { id: "electrum", name: "Electrum", logo: "https://electrum.org/theme/electrum/img/electrum-logo.png", url: "https://electrum.org/" },
  { id: "bluewallet", name: "BlueWallet", logo: "https://bluewallet.io/img/bluewallet-logo.png", url: "https://bluewallet.io/" },
  { id: "myetherwallet", name: "MyEtherWallet", logo: "https://www.myetherwallet.com/img/mew-logo.png", url: "https://www.myetherwallet.com/" },
  { id: "mycrypto", name: "MyCrypto", logo: "https://raw.githubusercontent.com/MyCryptoHQ/MyCrypto/master/src/assets/images/logo.png", url: "https://mycrypto.com/" },
  { id: "solflare", name: "Solflare", logo: "https://pbs.twimg.com/profile_images/1588239773448306688/5_RaEPPa_400x400.jpg", url: "https://solflare.com/" },
  { id: "ledger-live", name: "Ledger Live", logo: "https://cdn.brandfetch.io/idZAyF9rlg/w/400/h/400/theme/dark/icon.png", url: "https://www.ledger.com/ledger-live" },
  { id: "walletconnect", name: "WalletConnect", logo: "https://altcoinsbox.com/wp-content/uploads/2023/03/walletconnect-logo.png", url: "https://walletconnect.com/" },
  { id: "brave", name: "Brave Wallet", logo: "https://brave.com/static-assets/images/brave-logo-sans-text.svg", url: "https://brave.com/crypto/" },
  { id: "keplr", name: "Keplr", logo: "https://pbs.twimg.com/profile_images/1629988042090012673/o7yj_lk8_400x400.jpg", url: "https://www.keplr.app/" },
  { id: "zerion", name: "Zerion", logo: "https://pbs.twimg.com/profile_images/1598730896679591936/3Cv91LCI_400x400.jpg", url: "https://zerion.io/" },
  { id: "okx", name: "OKX Wallet", logo: "https://static.okx.com/cdn/assets/imgs/MjAyMTIxMw==/DDADC9D9393A6AA8.png", url: "https://www.okx.com/web3" },
  { id: "kraken", name: "Kraken", logo: "https://www.svgrepo.com/show/331435/kraken.svg", url: "https://www.kraken.com/" },
  { id: "binance", name: "Binance", logo: "https://public.bnbstatic.com/image/cms/blog/20200826/b3c15c68-85ae-4d58-baab-4db93f31ce63.png", url: "https://www.binance.com/" },
  { id: "cryptocom", name: "Crypto.com", logo: "https://crypto.com/static/47e2eaa59a4eaef6e8e26a445c6f8e18/favicon-32x32.png", url: "https://crypto.com/defi-wallet" },
  { id: "atomic", name: "Atomic Wallet", logo: "https://atomicwallet.io/images/logo-text.svg", url: "https://atomicwallet.io/" },
  { id: "edge", name: "Edge Wallet", logo: "https://edge.app/wp-content/uploads/2023/09/edge-logo.svg", url: "https://edge.app/" },
  { id: "guarda", name: "Guarda Wallet", logo: "https://guarda.com/assets/images/logo-white.svg", url: "https://guarda.com/" },
  { id: "zengo", name: "ZenGo", logo: "https://pbs.twimg.com/profile_images/1650101213127651328/5ovz_VbR_400x400.jpg", url: "https://zengo.com/" },
  { id: "blockchain", name: "Blockchain.com", logo: "https://login.blockchain.com/static/img/blockchain-icon.png", url: "https://www.blockchain.com/wallet" },
  { id: "bitget", name: "Bitget Wallet", logo: "https://img.bitgetimg.com/multiLang/web/5edf5ac08311c23fae761b1a9e5cb12c1673255764395.png", url: "https://web3.bitget.com/" },
  { id: "mathwallet", name: "MathWallet", logo: "https://mathwallet.org/images/icons/mathwallet.png", url: "https://mathwallet.org/" },
  { id: "tokenpocket", name: "TokenPocket", logo: "https://tp-lab.github.io/BlockchainGuideSeries/dist/images/TokenPocket.png", url: "https://www.tokenpocket.pro/" },
  { id: "oneinch", name: "1inch Wallet", logo: "https://pbs.twimg.com/profile_images/1751242054254784512/7R_6uLY-_400x400.jpg", url: "https://1inch.io/wallet/" },
  { id: "uniswap", name: "Uniswap Wallet", logo: "https://cryptologos.cc/logos/uniswap-uni-logo.png", url: "https://wallet.uniswap.org/" },
  { id: "rabby", name: "Rabby Wallet", logo: "https://pbs.twimg.com/profile_images/1519230764170137600/2vmBP8ti_400x400.jpg", url: "https://rabby.io/" },
  { id: "frame", name: "Frame", logo: "https://pbs.twimg.com/profile_images/1453457183827046402/zFbcT7lY_400x400.jpg", url: "https://frame.sh/" },
  { id: "taho", name: "Taho", logo: "https://pbs.twimg.com/profile_images/1557720734079811585/XgV4tWCz_400x400.jpg", url: "https://taho.xyz/" },
  { id: "alpha", name: "Alpha Wallet", logo: "https://alphawallet.com/wp-content/uploads/2023/07/alphawallet-logo.svg", url: "https://alphawallet.com/" },
  { id: "onto", name: "ONTO Wallet", logo: "https://pbs.twimg.com/profile_images/1525370500588711937/uWbTQ7Zx_400x400.jpg", url: "https://onto.app/" },
  { id: "unstoppable", name: "Unstoppable", logo: "https://pbs.twimg.com/profile_images/1743226378062872576/lDEOVMiW_400x400.jpg", url: "https://unstoppable.money/" },
  { id: "ambire", name: "Ambire Wallet", logo: "https://pbs.twimg.com/profile_images/1644983353912942592/uSWyHEDe_400x400.jpg", url: "https://www.ambire.com/" },
  { id: "coin98", name: "Coin98 Wallet", logo: "https://coin98.com/images/coin98-logo.png", url: "https://coin98.com/" },
  { id: "slope", name: "Slope Wallet", logo: "https://pbs.twimg.com/profile_images/1500406224806469633/TqwMTG8u_400x400.jpg", url: "https://slope.finance/" },
  { id: "glow", name: "Glow Wallet", logo: "https://pbs.twimg.com/profile_images/1670088377291694082/TYBCG_Mn_400x400.jpg", url: "https://glow.app/" },
  { id: "klever", name: "Klever Wallet", logo: "https://klever.io/wp-content/uploads/2023/02/klever-logo.svg", url: "https://klever.io/" }
];

function WalletCard({ wallet, index, prefersReducedMotion }: { wallet: typeof WALLETS[0], index: number, prefersReducedMotion: boolean }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

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
