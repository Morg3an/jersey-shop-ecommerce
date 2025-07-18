const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String, // 'jersey' or 'hoodie'
        enum: ['jersey', 'hoodie'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sizes: [String], // e.g., ['S', 'M', 'L', 'XL']
    colors: [String], // Available colors
    customizable: {
        type: Boolean,
        default: false
    },
    imageUrl: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema)