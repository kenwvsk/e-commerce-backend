const mongoose = require('mongoose');
const StockLineItemSchema = new mongoose.Schema({
    
    date: {
        type: Date,
        required: [true, 'Please add Date'],
    },
    marketplaces: {
        type: String,
        required: [true, 'Please add Marketplaces'],
    },
    warehouse: {
        type: String,
        required: [true, 'Please add Warehouse'],
    },
    sku: {
        type: String,
        required: [true, 'Please add SKU'],
    },
    amount: {
        type: Number,
        required: [true, 'Please add amount']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
    }
});

module.exports = mongoose.model('StockLineItem', StockLineItemSchema);