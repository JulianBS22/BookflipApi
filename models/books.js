const mongoose = require (mongoose);

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    photos: [String],
    description: String,
    pages: Number,
    price: Number
})

const BookModel = mongoose.model('Book',BookSchema);

module.exports = BookModel;