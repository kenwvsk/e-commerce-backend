const express = require('express');
const {getUploads, createUpload} = require('../controllers/uploads');
const router = express.Router();
const upload = require('../middleware/uploads.js');

router.route('/')
.get(getUploads)
.post(upload.single('file'), createUpload);
// router.route('/:id').get(getUpload).put(updateUpload).delete(deleteUpload);

module.exports=router;
