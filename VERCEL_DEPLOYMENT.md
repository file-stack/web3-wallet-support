# Deploy to Vercel

This guide shows how to deploy the Web3 Wallet Support application to Vercel.

## Prerequisites

- GitHub account with the repository pushed
- Vercel account (free at https://vercel.com)

## Deployment Steps

### Option 1: One-Click Deploy (Easiest)

1. Go to https://vercel.com/new
2. Select "Other" or "GitHub"
3. If GitHub: authorize and select the `web3-wallet-support` repository
4. Click "Import"
5. Set environment variables (see below)
6. Click "Deploy"

### Option 2: Manual Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts
```

## Environment Variables

Add these in Vercel dashboard (Settings → Environment Variables):

### Required for Production

1. **TELEGRAM_BOT_TOKEN**
   - Get from [@BotFather](https://t.me/botfather) on Telegram
   - Format: `123456789:ABCDefGHIjklmnoPQRstuvWXYZ`

2. **TELEGRAM_CHAT_ID**
   - Your Telegram chat ID (where issues will be posted)
   - Get from [@userinfobot](https://t.me/userinfobot) on Telegram
   - Format: `123456789`

3. **DATABASE_URL** (Optional - Use Vercel Postgres)
   - If using Vercel Postgres, copy the connection string
   - Format: `postgresql://user:password@host/database`

### Frontend Variables (with VITE_ prefix)

These are automatically available on the frontend:

```
VITE_API_URL=https://your-project.vercel.app/api
```

## Database Setup (Optional)

### Use Vercel Postgres (Recommended)

1. In Vercel dashboard, go to "Storage" tab
2. Click "Create Database" → "Postgres"
3. Copy the connection string
4. Add to Environment Variables as `DATABASE_URL`

### Use External Database

- Neon: https://neon.tech (free PostgreSQL)
- Supabase: https://supabase.com
- Railway: https://railway.app

Add the connection string as `DATABASE_URL` environment variable.

## Configuration Files

- **`vercel.json`** - Vercel deployment configuration
  - Build command: `npm run build`
  - Output directory: `dist`
  - Rewrites for API routes and SPA routing
  - Caching headers for performance

- **`.env.example`** - Environment variable template
  - Copy and customize for your deployment

## What Gets Deployed

```
web3-wallet-support/
├── dist/
│   ├── index.js (Production server)
│   ├── public/ (React static files)
│   └── ...
├── client/ (Frontend - compiled to dist/public)
├── server/ (Backend - compiled to dist/index.js)
└── shared/ (Shared types)
```

## Build Process

When you push to GitHub:

1. Vercel automatically detects changes
2. Runs `npm run build`
3. Vite builds React frontend → `dist/public/`
4. esbuild bundles Express server → `dist/index.js`
5. Vercel deploys both frontend + backend

## API Routes

All API routes are prefixed with `/api`:

- `POST /api/submit-issue` - Submit crypto wallet issue
- `POST /api/push-github` - Push code to GitHub (internal)

## Custom Domain

1. In Vercel dashboard, go to "Settings" → "Domains"
2. Click "Add Domain"
3. Enter your custom domain
4. Follow DNS configuration steps
5. SSL certificate auto-generated

## Monitoring & Logs

1. Go to Vercel dashboard for your project
2. Click "Deployments" to see deployment history
3. Click on a deployment → "Functions" to see server logs
4. Click "Logs" for real-time monitoring

## Preview Deployments

- Every push to GitHub creates a preview deployment
- Pull requests automatically get preview URLs
- Share preview links for team feedback

## Troubleshooting

### Build Fails

Check build logs in Vercel dashboard:
1. Go to deployment
2. Click "Build Logs" tab
3. Look for errors and fix locally
4. Push again

### Environment Variables Not Working

1. Verify variables are set in Vercel dashboard
2. For frontend, ensure they start with `VITE_`
3. Redeploy after adding variables
4. Check browser console for `import.meta.env` values

### Database Connection Issues

1. Verify `DATABASE_URL` is set correctly
2. Test connection locally with `npm run db:push`
3. Check database firewall/IP restrictions
4. For Vercel Postgres, IP allowlist is automatic

### API Routes Return 404

1. Check `vercel.json` rewrites configuration
2. Ensure `dist/index.js` exists (run `npm run build` locally)
3. Verify API routes start with `/api/`

### Static Files Not Loading

1. Check `dist/public/` contains your frontend files
2. Verify Vite build output in `vite.config.ts`
3. Check Vercel caching settings in `vercel.json`

## Performance Optimization

### Edge Caching

```json
// In vercel.json - Already configured
"headers": [
  {
    "source": "/(.*)",
    "headers": [{"key": "Cache-Control", "value": "public, max-age=3600"}]
  }
]
```

### Serverless Functions

All Node.js code runs as serverless functions:
- Auto-scales based on traffic
- Cold start ~1-2 seconds for Express
- 60-second timeout (free) / 900-second (pro)

### Database Connection Pooling

For PostgreSQL, use connection pooling to avoid timeouts:
- Neon: Built-in connection pooling
- Vercel Postgres: Automatically pooled
- External DB: Use Prisma or PgBouncer

## Production Checklist

- [ ] Environment variables set in Vercel
- [ ] Database configured and connected
- [ ] Telegram bot tokens configured
- [ ] GitHub integration working
- [ ] Custom domain added (optional)
- [ ] SSL certificate verified
- [ ] Monitor first deployment
- [ ] Test all API endpoints
- [ ] Test wallet search functionality
- [ ] Test issue submission
- [ ] Test theme switching
- [ ] Verify mobile responsiveness

## Advanced Configuration

### Custom Build Command

Edit `vercel.json` to use custom build:

```json
{
  "buildCommand": "npm install && npm run build"
}
```

### Region Selection

By default, Vercel deploys to multiple regions. To select specific regions, use Vercel dashboard or edit `vercel.json`:

```json
{
  "regions": ["sfo1", "lhr1"]
}
```

### Disable Automatic Deployments

In Vercel dashboard: Settings → Git → Toggle "Deploy on Push"

## Support & Resources

- Vercel Docs: https://vercel.com/docs
- Vercel Community: https://vercel.com/help
- GitHub Issues: https://github.com/file-stack/web3-wallet-support/issues
- Email Support: support@vercel.com (Pro plan)

---

**Happy deploying! Your Web3 Wallet Support app is now production-ready.** 🚀
