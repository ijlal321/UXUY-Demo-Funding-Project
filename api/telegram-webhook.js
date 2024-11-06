// api/telegram-webhook.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const message = req.body?.message;
  
      if (message && message.text) {
        const chatId = message.chat.id;
        const text = message.text;
  
        // Example response based on the message
        let responseText = "Hello! Here's a link to the app:";
        if (text.toLowerCase().includes("app")) {
          responseText += "\n\nhttps://uxuy-demo-funding-project.vercel.app";
        } else {
          responseText = "Send 'app' to get the link to the app!";
        }
  
        // Send a message back to the user
        const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
        await fetch(TELEGRAM_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: responseText,
          }),
        });
      }
  
      // Acknowledge the request from Telegram
      res.status(200).send('ok');
    } else {
      res.status(405).send('Method Not Allowed');
    }
  }
  