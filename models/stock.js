const mongoose = require('mongoose');
const StockSchema = new mongoose.Schema({
    
    date: {
        type: Date,
        required: [true, 'Please add Date'],
    },
    // marketplaces: {
    //     type: String,
    //     required: [true, 'Please add Marketplaces'],
    // },
    // warehouse: {
    //     type: String,
    //     required: [true, 'Please add Warehouse'],
    // },
    // sku: {
    //     type: String,
    //     required: [true, 'Please add SKU'],
    // },
    amount: {
        type: Number,
        required: [true, 'Please add amount on sell']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
    }
});

//objectId sku inventory

module.exports = mongoose.model('Stock', StockSchema);