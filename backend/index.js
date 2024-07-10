const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const MainRouter = require('./routes/index');




app.use('/api/v1',MainRouter);

app.listen(3000);