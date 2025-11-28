import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const WALLETS = [
  { id: "metamask", name: "MetaMask", logo: "https://logo.clearbit.com/metamask.io" },
  { id: "trust", name: "Trust Wallet", logo: "https://logo.clearbit.com/trustwallet.com" },
  { id: "ledger", name: "Ledger", logo: "https://logo.clearbit.com/ledger.com" },
  { id: "trezor", name: "Trezor", logo: "https://logo.clearbit.com/trezor.io" },
  { id: "exodus", name: "Exodus", logo: "https://logo.clearbit.com/exodus.com" },
  { id: "coinbase", name: "Coinbase Wallet", logo: "https://logo.clearbit.com/coinbase.com" },
  { id: "mew", name: "MyEtherWallet (MEW)", logo: "https://logo.clearbit.com/myetherwallet.com" },
  { id: "blockchain", name: "Blockchain.com Wallet", logo: "https://logo.clearbit.com/blockchain.com" },
  { id: "electrum", name: "Electrum", logo: "https://logo.clearbit.com/electrum.org" },
  { id: "mycelium", name: "Mycelium", logo: "https://logo.clearbit.com/mycelium.com" },
  { id: "coinomi", name: "Coinomi", logo: "https://logo.clearbit.com/coinomi.com" },
  { id: "atomic", name: "Atomic Wallet", logo: "https://logo.clearbit.com/atomicwallet.io" },
  { id: "guarda", name: "Guarda", logo: "https://logo.clearbit.com/guarda.com" },
  { id: "bitpay", name: "BitPay", logo: "https://logo.clearbit.com/bitpay.com" },
  { id: "zengo", name: "ZenGo", logo: "https://logo.clearbit.com/zengo.com" },
  { id: "safepal", name: "SafePal", logo: "https://logo.clearbit.com/safepal.io" },
  { id: "brave", name: "Brave Wallet", logo: "https://logo.clearbit.com/brave.com" },
  { id: "phantom", name: "Phantom", logo: "https://logo.clearbit.com/phantom.app" },
  { id: "solflare", name: "Solflare", logo: "https://logo.clearbit.com/solflare.com" },
  { id: "rainbow", name: "Rainbow", logo: "https://logo.clearbit.com/rainbow.me" },
  { id: "argent", name: "Argent", logo: "https://logo.clearbit.com/argent.com" },
  { id: "imtoken", name: "imToken", logo: "https://logo.clearbit.com/imtoken.org" },
  { id: "portis", name: "Portis", logo: "https://logo.clearbit.com/portis.io" },
  { id: "magic", name: "Magic (Fortmatic)", logo: "https://logo.clearbit.com/magic.link" },
  { id: "gnosissafe", name: "Gnosis Safe", logo: "https://logo.clearbit.com/gnosis-safe.io" },
  { id: "trustology", name: "Trustology", logo: "https://logo.clearbit.com/trustology.io" },
  { id: "brd", name: "BRD", logo: "https://logo.clearbit.com/brd.com" },
  { id: "paxful", name: "Paxful", logo: "https://logo.clearbit.com/paxful.com" },
  { id: "bitgo", name: "BitGo", logo: "https://logo.clearbit.com/bitgo.com" },
  { id: "armory", name: "Armory", logo: "https://logo.clearbit.com/armory.io" },
  { id: "jaxx", name: "Jaxx Liberty", logo: "https://logo.clearbit.com/jaxx.io" },
  { id: "coinpayments", name: "CoinPayments", logo: "https://logo.clearbit.com/coinpayments.net" },
  { id: "edge", name: "Edge Wallet", logo: "https://logo.clearbit.com/edge.app" },
  { id: "tokenpocket", name: "TokenPocket", logo: "https://logo.clearbit.com/tokenpocket.pro" },
  { id: "mathwallet", name: "MathWallet", logo: "https://logo.clearbit.com/mathwallet.org" },
  { id: "onto", name: "Onto Wallet", logo: "https://logo.clearbit.com/onto.app" },
  { id: "keepkey", name: "KeepKey", logo: "https://logo.clearbit.com/keepkey.com" },
  { id: "huobi", name: "Huobi Wallet", logo: "https://logo.clearbit.com/huobiwallet.com" },
  { id: "okx", name: "OKX Wallet", logo: "https://logo.clearbit.com/okx.com" },
  { id: "binance", name: "Binance Wallet", logo: "https://logo.clearbit.com/binance.com" },
  { id: "coin98", name: "Coin98 Wallet", logo: "https://logo.clearbit.com/coin98.com" },
  { id: "slope", name: "Slope Wallet", logo: "https://logo.clearbit.com/slope.finance" },
  { id: "sollet", name: "Sollet", logo: "https://logo.clearbit.com/sollet.io" },
  { id: "torus", name: "Torus", logo: "https://logo.clearbit.com/tor.us" },
  { id: "web3auth", name: "Web3Auth", logo: "https://logo.clearbit.com/web3auth.io" },
  { id: "sequence", name: "Sequence", logo: "https://logo.clearbit.com/sequence.xyz" },
  { id: "coldcard", name: "Coldcard", logo: "https://logo.clearbit.com/coldcardwallet.com" },
  { id: "bitbox", name: "BitBox (Shift Crypto)", logo: "https://logo.clearbit.com/shiftcrypto.ch" },
  { id: "ellipal", name: "Ellipal", logo: "https://logo.clearbit.com/ellipal.com" },
  { id: "blockwallet", name: "BlockWallet", logo: "https://logo.clearbit.com/blockwallet.io" },
  { id: "greymass", name: "Greymass Anchor", logo: "https://logo.clearbit.com/greymass.com" },
  { id: "zelcore", name: "ZelCore", logo: "https://logo.clearbit.com/zelcore.io" },
  { id: "klever", name: "Klever", logo: "https://logo.clearbit.com/klever.io" },
  { id: "freewallet", name: "Freewallet", logo: "https://logo.clearbit.com/freewallet.org" },
  { id: "safe", name: "Safe (Gnosis)", logo: "https://logo.clearbit.com/safe.global" },
  { id: "kraken", name: "Kraken Wallet", logo: "https://logo.clearbit.com/kraken.com" },
  { id: "bybit", name: "Bybit Wallet", logo: "https://logo.clearbit.com/bybit.com" },
  { id: "cryptocom", name: "Crypto.com DeFi Wallet", logo: "https://logo.clearbit.com/crypto.com" },
  { id: "paybis", name: "Paybis Wallet", logo: "https://logo.clearbit.com/paybis.com" },
  { id: "lobstr", name: "Lobstr Wallet", logo: "https://logo.clearbit.com/lobstr.co" },
  { id: "stellarterm", name: "StellarTerm", logo: "https://logo.clearbit.com/stellarterm.com" },
  { id: "solar", name: "Solar Wallet", logo: "https://logo.clearbit.com/solar.org" },
  { id: "nami", name: "Nami Wallet", logo: "https://logo.clearbit.com/namiwallet.io" },
  { id: "eternl", name: "Eternl Wallet", logo: "https://logo.clearbit.com/eternl.io" },
  { id: "flint", name: "Flint Wallet", logo: "https://logo.clearbit.com/flint-wallet.com" },
  { id: "typhon", name: "Typhon Wallet", logo: "https://logo.clearbit.com/typhonwallet.io" },
  { id: "yoroi", name: "Yoroi", logo: "https://logo.clearbit.com/yoroi-wallet.com" },
  { id: "keplr", name: "Keplr Wallet", logo: "https://logo.clearbit.com/keplr.app" },
  { id: "cosmostation", name: "Cosmostation", logo: "https://logo.clearbit.com/cosmostation.io" },
  { id: "leap", name: "Leap Wallet", logo: "https://logo.clearbit.com/leapwallet.io" },
  { id: "xdefi", name: "XDEFI Wallet", logo: "https://logo.clearbit.com/xdefi.io" },
  { id: "rabby", name: "Rabby Wallet", logo: "https://logo.clearbit.com/rabby.io" },
  { id: "frame", name: "Frame Wallet", logo: "https://logo.clearbit.com/frame.sh" },
  { id: "temple", name: "Temple Wallet", logo: "https://logo.clearbit.com/templewallet.com" },
  { id: "kukai", name: "Kukai Wallet", logo: "https://logo.clearbit.com/kukai.app" },
  { id: "finoa", name: "Finoa", logo: "https://logo.clearbit.com/finoa.io" },
  { id: "fireblocks", name: "Fireblocks", logo: "https://logo.clearbit.com/fireblocks.com" },
  { id: "copper", name: "Copper Custody", logo: "https://logo.clearbit.com/copper.co" },
  { id: "anchorage", name: "Anchorage Digital", logo: "https://logo.clearbit.com/anchorage.com" },
  { id: "safepals1", name: "SafePal S1 Hardware", logo: "https://logo.clearbit.com/safepal.io" },
  { id: "onekey", name: "OneKey Wallet", logo: "https://logo.clearbit.com/onekey.so" },
  { id: "tangem", name: "Tangem Wallet", logo: "https://logo.clearbit.com/tangem.com" },
  { id: "opolo", name: "Opolo Wallet", logo: "https://logo.clearbit.com/opolo.io" },
  { id: "secux", name: "SecuX Wallet", logo: "https://logo.clearbit.com/secuxtech.com" },
  { id: "coolwallet", name: "CoolWallet", logo: "https://logo.clearbit.com/coolwallet.io" },
  { id: "arculus", name: "Arculus Wallet", logo: "https://logo.clearbit.com/arculus.co" },
  { id: "airgap", name: "AirGap Wallet", logo: "https://logo.clearbit.com/airgap.it" },
  { id: "bread", name: "Bread Wallet", logo: "https://logo.clearbit.com/brd.com" },
  { id: "monero", name: "Monero GUI Wallet", logo: "https://logo.clearbit.com/getmonero.org" },
  { id: "feather", name: "Feather Wallet", logo: "https://logo.clearbit.com/featherwallet.org" },
  { id: "cake", name: "Cake Wallet", logo: "https://logo.clearbit.com/cakewallet.com" },
  { id: "samourai", name: "Samourai Wallet", logo: "https://logo.clearbit.com/samouraiwallet.com" },
  { id: "wasabi", name: "Wasabi Wallet", logo: "https://logo.clearbit.com/wasabiwallet.io" },
  { id: "bluewallet", name: "BlueWallet", logo: "https://logo.clearbit.com/bluewallet.io" },
  { id: "green", name: "Green Wallet (Blockstream)", logo: "https://logo.clearbit.com/blockstream.com" },
  { id: "phoenix", name: "Phoenix Wallet", logo: "https://logo.clearbit.com/phoenix.acinq.co" },
  { id: "simplehold", name: "SimpleHold", logo: "https://logo.clearbit.com/simplehold.io" },
  { id: "pillar", name: "Pillar Wallet", logo: "https://logo.clearbit.com/pillar.fi" },
  { id: "loopring", name: "Loopring Wallet", logo: "https://logo.clearbit.com/loopring.io" },
  { id: "aave", name: "AAVE Wallet", logo: "https://logo.clearbit.com/aave.com" },
  { id: "sushi", name: "Sushi Wallet", logo: "https://logo.clearbit.com/sushi.com" },
  { id: "uniswap", name: "Uniswap Wallet", logo: "https://logo.clearbit.com/uniswap.org" },
  { id: "krystal", name: "Krystal Wallet", logo: "https://logo.clearbit.com/krystal.app" },
  { id: "maiar", name: "Maiar (xPortal)", logo: "https://logo.clearbit.com/xportal.com" },
  { id: "vara", name: "Vara Wallet", logo: "https://logo.clearbit.com/vara.network" },
  { id: "polkadot", name: "Polkadot JS Wallet", logo: "https://logo.clearbit.com/polkadot.js.org" },
  { id: "talisman", name: "Talisman Wallet", logo: "https://logo.clearbit.com/talisman.xyz" },
  { id: "subwallet", name: "SubWallet", logo: "https://logo.clearbit.com/subwallet.app" },
  { id: "bifrost", name: "Bifrost Wallet", logo: "https://logo.clearbit.com/bifrost.finance" },
  { id: "metax", name: "MetaX Wallet", logo: "https://logo.clearbit.com/metalife.com" },
  { id: "glow", name: "Glow Wallet", logo: "https://logo.clearbit.com/glow.app" },
  { id: "backpack", name: "Backpack Wallet", logo: "https://logo.clearbit.com/backpack.app" },
  { id: "rwallet", name: "RWallet", logo: "https://logo.clearbit.com/rwallet.io" }
];

function WalletCard({ wallet, index, prefersReducedMotion }: { wallet: typeof WALLETS[0], index: number, prefersReducedMotion: boolean }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href="/crypto-issues">
          <motion.div
            aria-label={`Get support for ${wallet.name} wallet`}
            className="group relative flex items-center justify-center aspect-square rounded-xl p-4 md:p-5 bg-card/50 border border-border/40 hover-elevate active-elevate-2 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-ring overflow-visible cursor-pointer hover:border-border/80"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, delay: (index % 50) * 0.02 }}
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
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, delay: (index % 50) * 0.02 }}
              className="relative z-10"
            >
              {!imageError ? (
                <img
                  src={wallet.logo}
                  alt={wallet.name}
                  onError={() => setImageError(true)}
                  className="h-12 w-12 md:h-16 md:w-16 object-contain transition-all duration-300"
                  data-testid={`logo-wallet-${wallet.id}`}
                />
              ) : (
                <Wallet 
                  className="h-12 w-12 md:h-16 md:w-16 text-primary transition-all duration-300"
                  data-testid={`icon-fallback-${wallet.id}`}
                />
              )}
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
    <div className="min-h-screen bg-background">
      <div className="relative z-10 px-6 py-16 md:px-8 md:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.7 }}
            className="text-center mb-20"
          >
            <h1 
              className="font-bold text-5xl md:text-7xl mb-6 text-foreground leading-tight"
              data-testid="text-page-title"
            >
              Connect Your Wallet
            </h1>
            <p 
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-4 font-normal"
              data-testid="text-page-subtitle"
            >
              Get instant support for 114+ cryptocurrency wallets
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select your wallet provider to access secure resources and community support
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-3 gap-8 mb-20 py-12 border-y border-border/30"
          >
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">114+</p>
              <p className="text-muted-foreground">Wallets Supported</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">24/7</p>
              <p className="text-muted-foreground">Community Help</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">100%</p>
              <p className="text-muted-foreground">Secure & Safe</p>
            </div>
          </motion.div>

          {/* Wallets Grid */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.7, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-8 text-foreground">Choose Your Wallet</h2>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3 md:gap-4">
              {WALLETS.map((wallet, index) => (
                <WalletCard key={wallet.id} wallet={wallet} index={index} prefersReducedMotion={prefersReducedMotion} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
