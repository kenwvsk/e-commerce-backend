const Inventories = require('../models/Inventory.js');
const Skus = require('../models/Sku.js');

//@desc     Get all Inventories
//@route    GET /api/v1/inventories
//@access   public
exports.getInventories = async (req, res, next) => {
  // res.status(200).json({sucess:true, msg:'Show all inventories'});
  let query;
  query = Inventories.find()
    // .populate({
    //   path: 'product',
    //   select: 'name description url',
    // })
    .populate({
      path: 'sku',
      select: 'name attributes url price description marketplaces',
      populate: { path: 'product', select: 'name description url' },
    });
  try {
    const inventories = await query;
    res
      .status(200)
      .json({ sucess: true, count: inventories.length, data: inventories });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ sucess: false });
  }
};

//@desc     Get single inventory
//@route    GET /api/v1/inventories/:id
//@access   public
exports.getInventory = async (req, res, next) => {
  try {
    const inventories = await Inventories.findById(req.params.id).populate({
      path: 'sku',
      select: 'name attributes url price description marketplaces',
      populate: { path: 'product', select: 'name description url' },
    });
    if (!inventories) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: inventories });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ success: false });
  }
};

//@desc     Create a inventory
//@route    POST /api/v1/skus/:skuId/inventories
//@access   Private
exports.createInventory = async (req, res, next) => {
  try {
    let query = req.params.skuId ? req.params.skuId : req.body.sku;
    const sku = await Skus.findById(query).populate({
      path: 'product',
      select: '_id name description url',
    });
    req.body.sku = sku
    if (!sku) {
      return res.status(404).json({
        sucess: false,
        message: `Not found SKU ID ${query}`,
      });
    }
    const inventories = await Inventories.create(req.body);
    // console.log(inventories);
    res.status(200).json({ success: true, data: inventories });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ sucess: false, message: 'Cannot create Inventory' });
  }
};

//@desc     Update single inventory
//@route    PUT /api/v1/inventories/:id
//@access   Private
exports.updateInventory = async (req, res, next) => {
  console.log(req.body);
  try {
    const inventories = await Inventories.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate({
      path: 'sku',
      select: 'name attributes url price description marketplaces',
      populate: { path: 'product', select: 'name description url' },
    });
    if (!inventories) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: inventories });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc     Delete single inventory
//@route    DELETE /api/v1/inventories/:id
//@access   Private
exports.deleteInventory = async (req, res, next) => {
  console.log(req.body);
  try {
    const inventories = await Inventories.findById(req.params.id);
    if (!inventories) {
      return res.status(400).json({ success: false });
    }
    inventories.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

module.exports = exports;
