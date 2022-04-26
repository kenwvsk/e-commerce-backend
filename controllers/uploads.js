const Uploads = require('../models/Upload.js');
const upload = require('../middleware/uploads.js');
// const { find } = require('../models/Upload.js');
// const multer= require('multer');

//@desc     Get all Uploads
//@route    GET /api/v1/uploads
//@access   public
exports.getUploads= async (req,res,next)=>{
      try { 
          const uploads = await Uploads.find();
          res.status(200).json({sucess:true, count: uploads.length, data:uploads});
      } catch(err) {
          console.log(err.message); 
          res.status(400).json({sucess:false});
      }
  };

// @desc     Create a upload
// @route    POST /api/v1/uploads/
// @access   Private

exports.createUpload = async (req,res,next) => {
  try{
    console.log(req.file);
    if (req.file == undefined){
      return res.status(500).json({sucess: false, message: 'No selected file'});
    }
    const uploads = await Uploads.create(req.file)
    return res.status(201).json({sucess: true, data: uploads})
  }catch(err){
    console.log(err.message); 
    res.status(400).json({sucess:false});
  }
};



// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
//   })

//   var upload = multer({ storage: storage })
  
//   // app.use('/uploads', express.static('uploads'));
//   // app.post('/single', upload.single('file'), function (req, res, next) {
//   console.log(JSON.stringify(req.file))
  
//     res.send(req.file)
//   return res.send(response)
//   }
  