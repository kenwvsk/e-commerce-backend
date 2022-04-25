
const mongoose = require('mongoose');
const {StockLineItemSchema, StockLineItemModel} = require('../models/StockLineItem.js')

const StockSchema = new mongoose.Schema({

    date: {
        type: Date,
        required: [true, 'Please add Date'],
    },
    marketplaces: {
        type: String,
        required: [true, 'Please choose Marketplaces']
    },
    warehouse: {
        type: String,
        required: [true, 'Please choose Warehouse']
    },
    items: [StockLineItemSchema]
});

//objectId sku inventory

module.exports = mongoose.model('Stock', StockSchema);