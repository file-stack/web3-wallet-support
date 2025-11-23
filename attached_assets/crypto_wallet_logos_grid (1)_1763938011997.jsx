import React from "react";

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
  { id: "zerion", name: "Zerion Wallet", logo: "https://avatars.githubusercontent.com/u/60892095?s=200&v=4", url: "https://zerion.io/" },
  { id: "okx", name: "OKX Wallet", logo: "https://static.okx.com/cdn/assets/imgs/221/7F4FBC680D1C1B54.png", url: "https://www.okx.com/web3" },
  { id: "kraken", name: "Kraken Wallet", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Kraken_logo.png", url: "https://www.kraken.com/" }
];

export default function WalletGrid() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">All Types of Crypto Wallets</h1>
        <section className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
          {WALLETS.map(wallet => (
            <a key={wallet.id} href={wallet.url} target="_blank" rel="noopener noreferrer" className="rounded-xl p-4 bg-white/40 dark:bg-slate-800/40 shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 flex items-center justify-center">
              <img src={wallet.logo} alt={`${wallet.name} logo`} className="h-16 w-16 object-contain" />
            </a>
          ))}
        </section>
      </div>
    </div>
  );
}
