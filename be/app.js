require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const createMeeting = require('./libs/meet.lib');
const { jsonResponse } = require('./middlewares/jsonresponse.middleware');
const { PORT } = process.env;

app.use(express.json());
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(cors());
app.use(jsonResponse);

app.get('/meet', createMeeting);
app.get('/', async (req, res) => {
  res.status(200).json({ data: 'Welcome To Kamandaka Care' });
});
app.use('/api/v1', routes);

app.listen(PORT, () => console.log('Running app in port', PORT));
