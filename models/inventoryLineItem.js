const mongoose = require('mongoose');
const InventoryLineItemSchema = new mongoose.Schema({
    
    date:{
        type: Date,
    },
    warehousetype: {
        type: String,
    },
    sku: {
        type: mongoose.Schema.ObjectId,
        ref: 'Sku',
    },
    amount: {
        type: Number,
    }
});

module.exports.InventoryLineItemSchema = InventoryLineItemSchema;
module.exports.InventoryLineItemModel = mongoose.model('InventoryLineItem', InventoryLineItemSchema);