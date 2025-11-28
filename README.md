# Web3 Wallet Support - Multi-Wallet Support Platform

A professional cryptocurrency wallet support application featuring 114+ wallets with WalletConnect-inspired design, glassmorphism effects, and multi-language support.

## Features

✨ **114+ Cryptocurrency Wallets** - MetaMask, Trust Wallet, Coinbase Wallet, Ledger, and more  
🎨 **WalletConnect Design** - White & glossy blue theme with glassmorphism effects  
🌓 **Dark/Light Mode** - Persistent theme preference with system detection  
🔍 **Smart Search** - Real-time wallet filtering by name  
📱 **Issue Submission** - Report wallet issues with Telegram bot integration  
🔗 **GitHub Sync** - Automated code push to repository  
🌍 **Multi-Language Support** - Global accessibility for international users  

## Quick Start on Replit

### Option 1: Import from GitHub

1. Go to https://replit.com
2. Click "+ Create" → "Import from GitHub"
3. Paste: `https://github.com/file-stack/web3-wallet-support.git`
4. Click "Import"
5. Configure secrets (see below)
6. Click "Run"

### Option 2: Clone Locally and Push to Replit

```bash
git clone https://github.com/file-stack/web3-wallet-support.git
cd web3-wallet-support
npm install
npm run dev
```

## Environment Setup

### Required Secrets (Replit Secrets Tab)

1. **TELEGRAM_BOT_TOKEN** - Get from [@BotFather](https://t.me/botfather) on Telegram
2. **TELEGRAM_CHAT_ID** - Your Telegram chat ID (where issues are posted)

### Optional Integrations

- **GitHub** - For automated code pushes (already configured in `.replit`)

### Database

The application uses a PostgreSQL database (included in Replit). No additional setup needed.

## Project Structure

```
web3-wallet-support/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable UI components
│   │   ├── lib/           # Utilities and contexts
│   │   └── index.css      # Global styles + glassmorphism
│   └── index.html
├── server/                 # Express backend
│   ├── routes.ts          # API endpoints
│   ├── storage.ts         # Data layer
│   ├── index-dev.ts       # Development server
│   └── index-prod.ts      # Production server
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Drizzle ORM schemas
├── .replit                # Replit configuration
├── vite.config.ts         # Vite bundler config
└── tailwind.config.ts     # Tailwind CSS config
```

## Development

### Local Development

```bash
npm run dev
```

Runs on http://localhost:5000

### Build for Production

```bash
npm run build
```

### Type Checking

```bash
npm run check
```

## Features Guide

### Wallet Grid
- Browse 114+ cryptocurrency wallets
- Real-time search and filtering
- Wallet logos from Clearbit
- Responsive grid layout (4-10 columns)
- Hover animations with glassmorphism effects

### Crypto Issues
- Submit wallet-related issues
- Issue categorization (transaction, security, connectivity, etc.)
- Optional wallet address field
- Telegram bot notifications
- Form validation with Zod

### Theme Switcher
- Toggle between light and dark modes
- Preference stored in localStorage
- System preference detection
- Smooth transitions

### Language Switcher
- Support for 6+ languages (English, Spanish, French, German, Chinese, Japanese)
- Persistent language preference
- All UI text translated

## Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **React Hook Form** - Form management
- **TanStack Query** - Server state
- **Wouter** - Routing
- **Framer Motion** - Animations

### Backend
- **Express.js** - Server framework
- **Drizzle ORM** - Database ORM
- **PostgreSQL** - Database
- **TypeScript** - Type safety

### APIs & Services
- **Telegram Bot API** - Issue notifications
- **GitHub API** - Code syncing
- **Clearbit** - Wallet logos

## Configuration Files

### `.replit`
Defines how the project runs on Replit:
- Development command: `npm run dev`
- Production build: `npm run build`
- Production start: `npm run start`
- Ports: 5000 (main), 40101 (backup), 41489 (backup)

### `vite.config.ts`
Frontend build configuration with aliases and dev server setup

### `tailwind.config.ts`
Tailwind CSS configuration with custom theme (white + glossy blue)

### `drizzle.config.ts`
Database schema and migration configuration

## Customization

### Add New Wallets
Edit `client/src/pages/home.tsx` and add to the wallets array

### Change Colors
Update HSL variables in `client/src/index.css`:
- Primary: `--primary: 210 100% 50%` (Blue)
- Secondary: `--secondary: 199 100% 48%` (Cyan)

### Add New Pages
1. Create component in `client/src/pages/`
2. Register route in `client/src/App.tsx`
3. Add navigation link in header

### Translate Content
Add translations to `client/src/lib/i18n/` directory

## API Endpoints

- `POST /api/submit-issue` - Submit crypto issue
- `POST /api/push-github` - Push code to GitHub (internal)

## Deployment

The application is configured for Replit deployment:

1. Click "Publish" in Replit
2. Get a live URL at `your-project.replit.dev`
3. Custom domain support available

## Troubleshooting

### Port Already in Use
The `.replit` file has multiple port configurations. Replit will automatically select available ports.

### Database Connection Issues
Replit automatically provisions PostgreSQL. Check environment variables are set.

### Telegram Not Working
Verify `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are set in Replit Secrets

### GitHub Push Failing
Ensure GitHub integration is connected in Replit with proper OAuth permissions

## License

MIT

## Support

- 📧 Report issues: Use the Crypto Issues page
- 🐛 GitHub Issues: https://github.com/file-stack/web3-wallet-support/issues
- 💬 Community: Discussions on GitHub

---

**Built with Replit** • **Powered by Web3** • **Made for Global Users**
