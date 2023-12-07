const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

const app = express();

const corsOptions = {
    exposedHeaders: ['Has-Next-Page', 'Total-Log-Count'],
}

// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));

const logs = require('./routes/logs');
const auth = require('./routes/auth');

app.use('/api/v1/logs', logs);
app.use('/api/v1/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));