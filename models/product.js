const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlenght:[30, 'Name can not be more than 30 characters']
    }, 
    description: {
        type: String,
        maxlenght:[100, 'Description can not be more than 100 characters']
    },
    url:{
        type: String
    }
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
}
);

//reverse populate with virtuals
ProductSchema.virtual('skus', {
    ref: 'Sku',
    localField: '_id',
    foreignField: 'product',
    justOne: false
});

//cascade delete
ProductSchema.pre('remove', async function(next){
    console.log(`Sku being removed from product ${this._id}`);
    await this.model('Sku').deleteMany({product: this._id});
    next();
});

module.exports = mongoose.model('Product', ProductSchema);