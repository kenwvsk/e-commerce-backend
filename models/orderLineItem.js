const mongoose = require('mongoose');
const OrderLineItemSchema = new mongoose.Schema({
    
    status: {
        type: String,
        required: [true]
    },
    orderNumber: {
        type: Number,
        unique: true,
        required: [true, 'Please add Order number'],
    },
    date: {
        type: Date,
        required: [true, 'Please add Date'],
    },
    marketplaces: {
        type: String,
        required: [true, 'Please add Marketplaces'],
    },
    tracking: {
        type: String,
        unique: true
    },
    courier: {
        type: String,
    },
    sku:{
        type: String,
        required: [true, 'Please add SKU']
    },
    price:{
        type: Number,
        required: [true, 'Please add Price']
    },
    item:{
        type: Number,
        required: [true, 'Please add Item']
    }
});

module.exports = mongoose.model('OrderLineItem', OrderLineItemSchema);