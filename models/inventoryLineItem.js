const mongoose = require('mongoose');
const InventoryLineItemSchema = new mongoose.Schema({
    
    date:{
        type: Date,
    },
    warehousetype: {
        type: String,
    },
    sku: {
        type: String,
    },
    amount: {
        type: Number,
    }
});

module.exports = mongoose.model('InventoryLineItem', InventoryLineItemSchema);