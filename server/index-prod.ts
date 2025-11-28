import fs from "node:fs";
import path from "node:path";
import { type Server } from "node:http";
import { fileURLToPath } from "node:url";

import express, { type Express } from "express";
import runApp from "./app";

export async function serveStatic(app: Express, _server: Server) {
  // Get the directory of the current file
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  
  // Try multiple possible paths for the public directory
  const possiblePaths = [
    path.resolve(__dirname, "public"),
    path.resolve(__dirname, "../public"),
    path.resolve(__dirname, "dist/public"),
    path.resolve(__dirname, "../dist/public"),
    path.join(process.cwd(), "public"),
    path.join(process.cwd(), "dist/public"),
  ];
  
  let distPath: string | null = null;
  for (const p of possiblePaths) {
    if (fs.existsSync(p) && fs.existsSync(path.join(p, "index.html"))) {
      distPath = p;
      break;
    }
  }

  if (!distPath) {
    console.error("Tried paths:", possiblePaths);
    throw new Error(
      `Could not find the build directory with index.html. Tried: ${possiblePaths.join(", ")}`,
    );
  }

  console.log(`Serving static files from: ${distPath}`);
  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath!, "index.html"));
  });
}

(async () => {
  await runApp(serveStatic);
})();
