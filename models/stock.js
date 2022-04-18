
const mongoose = require('mongoose');
const StockLineItemsSchema = new mongoose.Schema({
    inventory: {
        type: mongoose.Schema.ObjectId,
        ref: 'Inventory',
        required: true
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
    },
    amountonsell: {
        type: Number,
        required: [true, 'Please add amount on sell']
    },
})
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
    items: [StockLineItemsSchema]

    // },
    // amount: {
    //     type: Number,
    //     required: [true, 'Please add amount on sell']
    // },
    // price: {
    //     type: Number,
    //     required: [true, 'Please add a price'],
    // },
    // sku:{
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Sku',
    //     required: true
    // },
    // inventory:{
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Inventory',
    //     required: true
    // }
});

//objectId sku inventory

module.exports = mongoose.model('Stock', StockSchema);