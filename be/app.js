require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes')
const {PORT} = process.env;

app.use('/api/v1', routes);

app.listen(PORT, () => console.log('Running app in port', PORT));
