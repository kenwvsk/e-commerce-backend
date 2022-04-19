const Stocks = require('../models/Stock.js');
const Inventories = require('../models/Inventory.js');
const Skus = require('../models/Sku.js');
const { populate } = require('../models/Stock.js');

//@desc     Get all Stocks
//@route    GET /api/v1/stocks
//@access   public
exports.getStocks = async (req, res, next) => {
  let query;
  query = Stocks.find()
  .populate({
    path: 'items.inventory',
    select: '_id date warehousetype availableamount',
    populate: {
      path: 'sku',
      select: '_id name attributes url price description marketplaces',
    },
  });
  try {
    const stocks = await query;
    res.status(200).json({ sucess: true, count: stocks.length, data: stocks });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ sucess: false });
  }
};

//@desc     Get single stock
//@route    GET /api/v1/stocks/:id
//@access   public
exports.getStock = async (req, res, next) => {
  try {
    const stocks = await Stocks.findById(req.params.id)
    .populate({
      path: 'items.inventory',
      select: '_id date warehousetype availableamount',
      populate: {
        path: 'sku',
        select: '_id name attributes url price description marketplaces',
      },
    });
    if (!stocks) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: stocks });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ success: false });
  }
};

//@desc     Create a stock
//@route    POST /api/v1/stocks
//@access   Private
exports.createStock = async (req, res, next) => {
  try {
    // need for loop checking
    // const inventory = await Inventories.findById(req.body.inventory);
    // if (!inventory) {
    //   return res.status(404).json({
    //     sucess: false,
    //     message: `Not found Inventory ID ${req.body.inventory}`,
    //   });
    // }
    const stocks = await Stocks.create(req.body);
    console.log(stocks);
    res.status(200).json({ success: true, data: stocks });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ sucess: false, message: 'Cannot create Stocks' });
  }
};

//@desc     Update single stock
//@route    PUT /api/v1/stocks/:id
//@access   Private
exports.updateStock = async (req, res, next) => {
  console.log(req.body);
  try {
    const stocks = await Stocks.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    .populate({
        path: 'items.inventory', 
        select: '_id date warehousetype availableamount',
        populate: { path: 'sku', select: '_id name attributes url price description marketplaces' }
    });
    if (!stocks) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: stocks });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc     Delete single stock
//@route    DELETE /api/v1/stocks/:id
//@access   Private
exports.deleteStock = async (req, res, next) => {
  console.log(req.body);
  try {
    const stocks = await Stocks.findById(req.params.id);
    if (!stocks) {
      return res.status(400).json({ success: false });
    }
    stocks.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

module.exports = exports;
