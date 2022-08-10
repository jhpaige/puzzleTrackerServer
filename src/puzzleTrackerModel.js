require("dotenv").config();
const mongoose = require('mongoose');

const MONGO_URI = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@cluster0.kjpwslq.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'puzzleTracker'
})
    .then(() => console.log('Connected to Mongo DB.'))
    .catch(err => console.log(err));

const Schema = mongoose.Schema;

// Sets a schema for each puzzle
const puzzleSchema = new Schema({
    image: { type: String, required: true },
    name: { type: String, required: true },
    times: { type: Array, required: true },
})

module.exports = mongoose.model('puzzle', puzzleSchema);