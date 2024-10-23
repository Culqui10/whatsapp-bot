const express = require('express');
const twilio = require('twilio');
const app = express();

const MessagingResponse = twilio.twiml.MessagingResponse;

app.use(express.urlencoded({ extended: true }));

app.post('/whatsapp', (req, res) => {
  const twiml = new MessagingResponse();
  const message = req.body.Body.toLowerCase();

  if (message.includes('contraseña')) {
    twiml.message('Para restablecer tu contraseña de Netflix, por favor visita: https://www.netflix.com/es/loginhelp');
  } else if (message.includes('código de acceso')) {
    twiml.message('Para obtener un código de acceso temporal de Netflix, ve a: https://www.netflix.com/es/LoginHelp');
  } else {
    twiml.message('Hola, ¿en qué puedo ayudarte? Puedes decir "contraseña" o "código de acceso" para recibir ayuda.');
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor iniciado.');
});
