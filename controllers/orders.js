const Orders = require('../models/Order.js');
const Skus = require('../models/Sku.js');


//@desc     Get all Orders
//@route    GET /api/v1/Orders
//@access   public
exports.getOrders = async (req, res, next) => {
  let query;
  query = Orders.find()
  .populate({
    path: 'items.skuId',
    select: '_id name attributes url price description marketplaces'
  });
  try {
    const orders = await query;
    res.status(200).json({ sucess: true, count: orders.length, data: orders });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ sucess: false });
  }
};

//@desc     Get single Order
//@route    GET /api/v1/Orders/:id
//@access   public
exports.getOrder = async (req, res, next) => {
  try {
    const orders = await Orders.findById(req.params.id)
    .populate({
        path: 'items.skuId',
        select: '_id name attributes url price description marketplaces'
      });
    if (!orders) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ success: false });
  }
};

//@desc     Create a Order
//@route    POST /api/v1/Orders
//@access   Private
exports.createOrder = async (req, res, next) => {
//need for loop checking
  try {
  //   const sku = await Skus.findById(req.body.items[0].skuId);
  //   if (!sku) {
  //     return res.status(404).json({
  //       sucess: false,
  //       message: `Not found sku ID ${req.body.skuId}`,
  //     });
  //  }
    const orders = await Orders.create(req.body);
    console.log(orders);
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ sucess: false, message: 'Cannot create Orders' });
  }
};

//@desc     Update single Order
//@route    PUT /api/v1/Orders/:id
//@access   Private
exports.updateOrder = async (req, res, next) => {
  console.log(req.body);
  try {
    const orders = await Orders.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!orders) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc     Delete single Order
//@route    DELETE /api/v1/Orders/:id
//@access   Private
exports.deleteOrder = async (req, res, next) => {
  console.log(req.body);
  try {
    const orders = await Orders.findById(req.params.id);
    if (!orders) {
      return res.status(400).json({ success: false });
    }
    orders.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

module.exports = exports;
