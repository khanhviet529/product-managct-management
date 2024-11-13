const mongoose = require('mongoose');
slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({ 
    position: Number,
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: Boolean,
    deleted: {
        type: Boolean,
        default: false
    },
    slug: { 
        type: String, 
        slug: "title",
        unique: true
    },
    deletedAt: Date
},  { timestamps: true });
const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;