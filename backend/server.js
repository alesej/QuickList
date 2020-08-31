const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const listRouter = require('./routes/lists.js');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true,
    useFindAndModify: false }
);

const connection = mongoose.connection;
connection.on('error', console.error.bind(console,'Connection Error to MongoDB'));
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

app.use("/", listRouter);
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});