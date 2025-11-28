export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { walletAddress, issueType, issueDescription } = req.body;

    if (!issueType || !issueDescription) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.warn('Telegram credentials not configured');
      return res.json({ success: true, message: 'Issue submitted (notification pending)' });
    }

    const telegramMessage = `
<b>🚨 New Crypto Issue Submitted</b>

<b>Wallet Address:</b> ${walletAddress || 'Not provided'}
<b>Issue Type:</b> ${issueType}

<b>Description:</b>
${issueDescription}

<i>Submitted at: ${new Date().toLocaleString()}</i>
`;

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'HTML'
        })
      }
    );

    if (response.ok) {
      res.json({ success: true, message: 'Issue submitted successfully' });
    } else {
      res.json({ success: true, message: 'Issue submitted (notification pending)' });
    }
  } catch (error) {
    console.error('Error processing issue submission:', error);
    res.status(500).json({ error: 'Failed to process submission' });
  }
}
