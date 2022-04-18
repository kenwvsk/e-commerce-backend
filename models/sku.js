const mongoose = require('mongoose');
const SkuSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: [true, 'Please add a SKU name'],
        unique: true,
        trim: true,
        maxlenght:[30, 'Name can not be more than 30 characters']
    },
    attributes: {
        type: String,
        required: [true, 'Please add a attributes']
    },
    url: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
    },
    description: {
        type: String,
        maxlenght:[100, 'Description can not be more than 100 characters']
    },
    marketplaces:{
        type: Array,
        required: [true, 'Please add marketplaces']    
    },
    product:{
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    }
});

module.exports = mongoose.model('Sku', SkuSchema);