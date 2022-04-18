const express = require('express');
const {getSkus,getSku,createSku,updateSku,deleteSku} = require('../controllers/skus');

//other resource
const inventoryRouter = require('./inventories');
const router = express.Router({mergeParams: true});
const {route} = require('./inventories');

//reroute
router.use('/:skuId/inventories/', inventoryRouter);

router.route('/').get(getSkus).post(createSku);
router.route('/:id').get(getSku).put(updateSku).delete(deleteSku);

module.exports=router;
