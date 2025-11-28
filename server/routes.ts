import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function sendTelegramMessage(message: string): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn("Telegram credentials not configured");
    return false;
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
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
      const { name, email, walletAddress, issueType, issueDescription } = req.body;

      // Validate required fields
      if (!name || !email || !issueType || !issueDescription) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Format message for Telegram
      const telegramMessage = `
<b>🚨 New Crypto Issue Submitted</b>

<b>Name:</b> ${name}
<b>Email:</b> ${email}
<b>Wallet Address:</b> ${walletAddress}
<b>Issue Type:</b> ${issueType}

<b>Description:</b>
${issueDescription}

<i>Submitted at: ${new Date().toLocaleString()}</i>
`;

      // Send to Telegram
      const sent = await sendTelegramMessage(telegramMessage);

      if (sent) {
        res.json({ success: true, message: "Issue submitted successfully" });
      } else {
        // Still return success to user even if Telegram fails, log the error
        console.error("Failed to send issue to Telegram");
        res.json({ success: true, message: "Issue submitted (notification pending)" });
      }
    } catch (error) {
      console.error("Error processing issue submission:", error);
      res.status(500).json({ error: "Failed to process submission" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
