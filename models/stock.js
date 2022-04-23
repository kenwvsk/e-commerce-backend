
const mongoose = require('mongoose');
const {StockLineItemSchema, StockLineItemModel} = require('../models/StockLineItem.js')
// const StockLineItemsSchema = new mongoose.Schema({
//     inventory: {
//         type: mongoose.Schema.ObjectId,
//         ref: 'Inventory',
//         required: true
//     },
//     price: {
//         type: Number,
//         required: [true, 'Please add a price'],
//     },
//     amountonsell: {
//         type: Number,
//         required: [true, 'Please add amount on sell']
//     },
// })
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