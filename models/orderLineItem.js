const mongoose = require('mongoose');
const OrderLineItemSchema = new mongoose.Schema({
    
    skuId:{
        type: mongoose.Schema.ObjectId,
        ref: 'Sku',
        required: true
    },
    price:{
        type: Number,
        required: [true, 'Please add Price']
    },
    amount: {
        type: Number,
        required: [true]
    }
});

module.exports.OrderLineItemSchema = OrderLineItemSchema;
module.exports.OrderLineItemModel = mongoose.model('OrderLineItem', OrderLineItemSchema);
