const Stocks = require('../models/Stock.js');

//@desc     Get all Stocks
//@route    GET /api/v1/stocks
//@access   public
exports.getStocks= async (req,res,next)=>{
   // res.status(200).json({sucess:true, msg:'Show all stocks'});
   try{ 
    const stocks = await Stocks.find();
    res.status(200).json({sucess:true, count: stocks.length, data:stocks});
} catch(err){
   console.log(err.message); 
   res.status(400).json({sucess:false});
}
};

//@desc     Get single stock
//@route    GET /api/v1/stocks/:id
//@access   public
 exports.getStock = async (req,res,next) =>{
     try{
        const stocks = await Stocks.findById(req.params.id);

        if(!stocks){
     
             return res.status(400).json({success: false});
         } 
     
       res.status(200).json({success: true, data: stocks});
    } catch(err){
       console.log(err.message); 
       res.status(400).json({success:false});
   }
 };

//@desc     Create a stock
//@route    POST /api/v1/stocks
//@access   Private
exports.createStock = async (req,res,next)=>{
    console.log(req.body);
    const stocks = await Stocks.create(req.body);
    res.status(201).json({success:true, data: stocks});
};

//@desc     Update single stock
//@route    PUT /api/v1/stocks/:id
//@access   Private
exports.updateStock= async (req,res,next)=>{
    console.log(req.body);
    try{
        const stocks = await Stocks.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators:true
    });
        if(!stocks){
            return res.status(400).json({success:false});
        }
        res.status(200).json({success:true,data:stocks});
    }
    catch(err){
        res.status(400).json({success:false});
    }
};

//@desc     Delete single stock
//@route    DELETE /api/v1/stocks/:id
//@access   Private
exports.deleteStock= async (req,res,next)=>{
    console.log(req.body);
    try{
        const stocks = await Stocks.findById(req.params.id);
        if(!stocks){
            return res.status(400).json({success:false});
        }
        Stocks.remove();
        res.status(200).json({success:true,data:{}});
    }
    catch(err){
        res.status(400).json({success:false});
    }
};

module.exports = exports;