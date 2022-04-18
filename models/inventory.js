const mongoose = require('mongoose');
const InventorySchema = new mongoose.Schema({
    
    date:{
        type: Date,
        required: true
    },
    warehousetype: {
        type: String,
        required: [true, 'Please add Warehouse'],
    },
    availableamount: {
        type: Number,
        required: [true, 'Please add amount']
    },
    // product:{
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Product',
    //     required: true
    // },
    sku:{
        type: mongoose.Schema.ObjectId,
        ref: 'Sku',
        required: true
    }
});

//objectId product sku

module.exports = mongoose.model('Inventory', InventorySchema);