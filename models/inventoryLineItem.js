const mongoose = require('mongoose');
const InventoryLineItemSchema = new mongoose.Schema({
    
    date:{
        type: Date,
        required: true
    },
    warehousetype: {
        type: String,
        required: [true, 'Please add warehouse'],
    },
    sku: {
        type: String,
        required: [true, 'Please add SKU'],
    },
    amount: {
        type: Number,
        required: [true, 'Please add amount']
    }
});

module.exports = mongoose.model('InventoryLineItem', InventoryLineItemSchema);