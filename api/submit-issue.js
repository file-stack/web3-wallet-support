export default async function handler(req, res) {
  // Handle OPTIONS for CORS
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  try {
    const { walletAddress, issueType, issueDescription } = req.body;

    console.log('Received submission:', { walletAddress, issueType, issueDescription });

    if (!issueType || !issueDescription) {
      console.error('Missing fields');
      return res.status(400).json({ error: 'Missing required fields: issueType and issueDescription' });
    }

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    console.log('Telegram config exists:', !!TELEGRAM_BOT_TOKEN, !!TELEGRAM_CHAT_ID);

    // Try to send to Telegram if credentials exist
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      try {
        const telegramMessage = `
<b>🚨 New Crypto Issue Submitted</b>

<b>Wallet Address:</b> ${walletAddress || 'Not provided'}
<b>Issue Type:</b> ${issueType}

<b>Description:</b>
${issueDescription}

<i>Submitted at: ${new Date().toLocaleString()}</i>
`;

        console.log('Sending to Telegram...');
        const telegramResponse = await fetch(
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

        const telegramText = await telegramResponse.text();
        console.log('Telegram response:', telegramResponse.status, telegramText);

        if (!telegramResponse.ok) {
          console.error('Telegram API error:', telegramText);
        } else {
          console.log('Telegram message sent successfully');
        }
      } catch (telegramError) {
        console.error('Error sending Telegram message:', telegramError);
      }
    } else {
      console.warn('Telegram credentials not configured');
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Issue submitted successfully' 
    });
  } catch (error) {
    console.error('Error processing issue submission:', error);
    return res.status(500).json({ 
      error: 'Failed to process submission',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
