const mongoose = require('mongoose');
const {OrderLineItemSchema, OrderLineItemModel} = require('../models/OrderLineItem.js')
const OrderSchema = new mongoose.Schema({
    
    date: {
        type: Date,
        required: [true, 'Please add Date'],
    },
    marketplace: {
        type: String,
        required: [true, 'Please add Marketplaces'],
    },
    orderNo: {
        type: String,
        unique: true,
        required: [true, 'Please add Order number'],
    },
    trackNo: {
        type: String,
        unique: true
    },
    orderStatus: {
        type: String,
        required: true
    },
    courier: {
        type: String,
        required: true
    },
    deliveryBy: {
        type: String,
        required: true
    },
    items: [OrderLineItemSchema]
});

module.exports = mongoose.model('Order', OrderSchema);