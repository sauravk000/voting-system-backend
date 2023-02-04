const express = require('express');
const mongoose = require('mongoose');
const candidate = require('./routes/candidate');
require('dotenv').config();


const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT;

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
}))



app.get('/',(req, res) => {
    console.log(req.body);
})

app.use('/candidate',candidate);
