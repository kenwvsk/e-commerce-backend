const mongoose = require('mongoose');
const SkuSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: [true, 'Please add a SKU name'],
        unique: true,
        trim: true,
        maxlenght:[30, 'Name can not be more than 30 characters']
    },
    attributes: {
        type: String,
        required: [true, 'Please add a attributes']
    },
    url: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
    },
    description: {
        type: String,
        maxlenght:[100, 'Description can not be more than 100 characters']
    },
    marketplaces:{
        type: Array,
        required: [true, 'Please add marketplaces']    
    },
    product:{
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    }
});

//cascade delete
SkuSchema.pre('remove', async function(next){
    console.log(`Inventory being removed from SKU ${this._id}`);
    await this.model('Inventory').deleteMany({sku: this._id});
    next();
});

module.exports = mongoose.model('Sku', SkuSchema);