import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Import the built server code
const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, '../.vercel/output/static');

// Simple catch-all to serve index.html for SPA routing
export default function handler(req, res) {
  const indexPath = join(distPath, 'index.html');
  
  if (fs.existsSync(indexPath)) {
    res.setHeader('Content-Type', 'text/html');
    const html = fs.readFileSync(indexPath, 'utf-8');
    res.send(html);
  } else {
    res.status(404).send('Not found');
  }
}
