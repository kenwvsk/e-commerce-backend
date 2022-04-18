const Products = require('../models/Product.js');
const Skus = require('../models/Sku.js');

//@desc     Get all Skus
//@route    GET /api/v1/skus
//@access   public
exports.getSkus= async (req,res,next)=>{
// res.status(200).json({sucess:true, msg:'Show all skus'});
    let query;
    query = Skus.find().populate({
        path: 'product',
        select: 'name description url'
    });
    try { 
        const skus = await query;
        res.status(200).json({sucess:true, count: skus.length, data:skus});
    } catch(err) {
        console.log(err.message); 
        res.status(400).json({sucess:false});
    }
};

//@desc     Get single sku
//@route    GET /api/v1/skus/:id
//@access   public
 exports.getSku = async (req,res,next) =>{
     try{
        const skus = await Skus.findById(req.params.id).populate({
            path: 'product',
            select: 'name description url'
        });

        if(!skus){
     
             return res.status(400).json({success: false});
         } 
     
       res.status(200).json({success: true, data: skus});
    } catch(err){
       console.log(err.message); 
       res.status(400).json({success:false});
   }
 };

//@desc     Create a sku
//@route    POST /api/v1/products/:productId/skus or POST /api/v1/skus/
//@access   Private
 exports.createSku = async (req,res,next)=>{
    try{
        let query = req.params.productId ? req.params.productId : req.body.product
        const product = await Products.findById(query);
        if(!product){
            return res.status(404).json({sucess: false, message: `Not found product ID ${req.params.productId}`});
        }
        req.body.product = query;
        const skus = await Skus.create(req.body);
        res.status(200).json({success:true, data: skus});
    } catch(error){
        console.log(error);
        return res.status(500).json({sucess: false, message: 'Cannot create SKU'})
    }
};

//@desc     Update single sku
//@route    PUT /api/v1/skus/:id
//@access   Private
exports.updateSku= async (req,res,next)=>{
    console.log(req.body);
    try{
        const skus = await Skus.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators:true
    });
        if(!skus){
            return res.status(400).json({success:false});
        }
        res.status(200).json({success:true,data:skus});
    }
    catch(err){
        res.status(400).json({success:false});
    }
};

//@desc     Delete single sku
//@route    DELETE /api/v1/skus/:id
//@access   Private
exports.deleteSku= async (req,res,next)=>{
    console.log(req.body);
    try{
        const skus = await Skus.findById(req.params.id);
        if(!skus){
            return res.status(400).json({success:false});
        }
        skus.remove();
        res.status(200).json({success:true,data:{}});
    }
    catch(err){
        res.status(400).json({success:false});
    }
};

module.exports = exports;