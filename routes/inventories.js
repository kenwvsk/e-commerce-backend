const express = require('express');
const {getInventories,getInventory,createInventory,updateInventory,deleteInventory} = require('../controllers/inventories');

const router = express.Router({mergeParams: true});

router.route('/').get(getInventories).post(createInventory);
router.route('/:id').get(getInventory).put(updateInventory).delete(deleteInventory);

module.exports=router;