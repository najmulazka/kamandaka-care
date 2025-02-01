require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const createMeeting = require('./libs/meet.lib');
const { PORT } = process.env;

// app.get('/auth/google', authGoogle);
// app.get('/auth/google', authGoogleCallback);
app.get('/meet', createMeeting);
app.get('/callback', async (req, res) => {
  const code = req.query.code; // Ambil kode otorisasi dari query parameter
  if (!code) {
    return res.status(400).send('Authorization code is missing.');
  }

  try {
    const authClient = await authorize(code); // Teruskan kode ke fungsi authorize
    console.log('callback', code);
    res.send('Authentication successful!');
  } catch (error) {
    res.status(500).send('Authentication failed: ' + error.message);
  }
});

app.use('/api/v1', routes);

app.listen(PORT, () => console.log('Running app in port', PORT));
