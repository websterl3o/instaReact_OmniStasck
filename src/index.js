const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
mongoose.connect('mongodb+srv://app:app@cluster0-ewi98.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

app.use('/files', express.static(path.resolve(__dirname, '..', 'resized')));
app.use(require('./routes'));

app.listen(3333);