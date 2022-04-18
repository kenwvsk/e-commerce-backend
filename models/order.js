const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    
    orderDate: {
        type: Date,
        required: [true, 'Please add Date'],
    },
    marketplaces: {
        type: String,
        required: [true, 'Please add Marketplaces'],
    },
    orderNumber: {
        type: Number,
        unique: true,
        required: [true, 'Please add Order number'],
    },
    tracking: {
        type: String,
        unique: true
    },
    status: {
        type: String,
        required: [true]
    },
    courier: {
        type: String,
    }
});

module.exports = mongoose.model('Order', OrderSchema);