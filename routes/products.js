const express = require('express');
const {getProducts,getProduct,createProduct,updateProduct,deleteProduct} = require('../controllers/products');

//other resource
const skuRouter = require('./skus');
const router = express.Router();
const {route} = require('./skus');

//reroute
router.use('/:productId/skus/', skuRouter);

router.route('/').get(getProducts).post(createProduct);
router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct);

module.exports=router;
