const mongoose = require('mongoose');
const StockSchema = new mongoose.Schema({
    
    date: {
        type: Date,
        required: [true, 'Please add Date'],
    },
    amount: {
        type: Number,
        required: [true, 'Please add amount on sell']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
    },
    sku:{
        type: mongoose.Schema.ObjectId,
        ref: 'Sku',
        required: true
    },
    inventory:{
        type: mongoose.Schema.ObjectId,
        ref: 'Inventory',
        required: true
    }
});

//objectId sku inventory

module.exports = mongoose.model('Stock', StockSchema);