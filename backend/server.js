const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log('success connecting'))
    .catch((err) => console.log(err));

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established succesfully');
});

const userRouter = require('./routes/user');
const foodRouter = require('./routes/food');

app.use('/user', userRouter);
app.use('/food', foodRouter);


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});