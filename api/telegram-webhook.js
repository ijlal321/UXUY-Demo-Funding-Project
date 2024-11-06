// api/telegram-webhook.js

module.exports = async (req, res) => {
    if (req.method === 'POST') {
      res.status(200).send('ok'); // Simply acknowledge the request without sending a response message
    } else {
      res.status(405).send('Method Not Allowed');
    }
  };
  