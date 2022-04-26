const Products = require('../models/Product.js');
const Uploads = require('../models/Upload.js');
const upload = require('../middleware/uploads.js');

//@desc     Get all Products
//@route    GET /api/v1/products
//@access   public
exports.getProducts = async (req,res,next)=>{
    let query;

    // //copy req.query
    // const reqQuery = {...req.query};

    // //fields to exclude
    // const removeFields=['select', 'sort', 'page', 'limit']

    // //loop over remove fields and delete them from reqQuery
    // removeFields.forEach(param => delete reqQuery[param]);
    // console.log(reqQuery);

    // //create query string
    // let queryStr = JSON.stringify(reqQuery);
    // queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g ,match => `$${match}`);
    query = Products.find().populate('skus');

    // //select fields
    // if(req.query.select){
    //     const fields = req.query.select.split(',').join(' ');
    //     query = query.select(fields);
    // }

    // //sort
    // if(req.query.sort){
    //     const sortBy = req.query.sort.split(',').join(' ');
    //     query = query.sort(sortBy);
    // } else{
    //     query = query.sort('-createdAt');
    // }

    // //pagination
    // const page = parseInt(req.query.page,10)||1;
    // const limit = parseInt(req.query.limit,10)||25;
    // const startIndex = (page-1)*limit;
    // const endIndex = (page*limit);
    // const total = await Products.countDocuments();
    // query = query.skip(startIndex).limit(limit);

    //executing query
    try{
        const products = await query;
        // //pagination result
        // const pagination = {};
        // if (endIndex<total){
        //     pagination.next={
        //         page:page+1,limit
        //     }
        // }
        // if (startIndex>0){
        //     pagination.prev={
        //         page:page-1,limit
        //     }
        // }

        res.status(200).json({sucess: true, count: products.length, data: products});
    } catch(err){
       console.log(err.message); 
       res.status(400).json({sucess:false});
    }
};

//@desc     Get single product
//@route    GET /api/v1/products/:id
//@access   public
 exports.getProduct = async (req,res,next) =>{
     try{
        const products = await Products.findById(req.params.id);

        if(!products){
     
             return res.status(400).json({success: false});
         } 
     
       res.status(200).json({success: true, data: products});
    } catch(err){
       console.log(err.message); 
       res.status(400).json({success:false});
   }
 };

//@desc     Create a product
//@route    POST /api/v1/products
//@access   Private
exports.createProduct = async (req,res,next)=>{
    console.log(req.body);
    const products = await Products.create(req.body);
    res.status(201).json({success:true, data: products});
};

//@desc     Update single product
//@route    PUT /api/v1/products/:id
//@access   Private
exports.updateProduct= async (req,res,next)=>{
    console.log(req.body);
    try{
        const products = await Products.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators:true
    });
        if(!products){
            return res.status(400).json({success:false});
        }
        res.status(200).json({success: true, data: products});
    }
    catch(err){
        res.status(400).json({success:false});
    }
};

//@desc     Delete single product
//@route    DELETE /api/v1/products/:id
//@access   Private
exports.deleteProduct= async (req,res,next)=>{
    console.log(req.body);
    try{
        const products = await Products.findById(req.params.id);
        if(!products){
            return res.status(400).json({success:false});
        }
        products.remove();
        res.status(200).json({success:true,data:{}});
    }
    catch(err){
        res.status(400).json({success:false});
    }
};

module.exports = exports;