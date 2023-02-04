const express = require('express');
require('dotenv').config();


const app = express();

const PORT = process.env.PORT;

app.get((req, res) => {
    console.log(req.body);
})

app.listen(PORT, function () {
    console.log(`Program is running on: ${PORT}`);
});