const mongoose = require('mongoose');
const StockLineItemSchema = new mongoose.Schema({
    
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

module.exports.StockLineItemSchema = StockLineItemSchema;
module.exports.StockLineItemModel = mongoose.model('StockLineItem', StockLineItemSchema);