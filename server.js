const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
//Route files
const products = require('./routes/products');
const skus =require('./routes/skus');
const inventories = require('./routes/inventories');
const stocks = require('./routes/stocks');
const orders = require('./routes/orders');
//const user =require('./routes/user');

var multer  = require('multer')

//Load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();


const app=express();

//Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

//Mount routers
app.use('/api/v1/products', products);
app.use('/api/v1/skus', skus);
app.use('/api/v1/inventories', inventories);
app.use('/api/v1/stocks', stocks);
app.use('/api/v1/orders', orders);
//app.use('/api/v1/user', user);


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })
app.use('/uploads', express.static('uploads'));
app.post('/single', upload.single('file'), function (req, res, next) {
console.log(JSON.stringify(req.file))

  res.send(req.file)
return res.send(response)
})

const PORT=process.env.PORT || 5000;
const server =  app.listen(PORT,console.log('Server running in', process.env.NODE_ENV,'mode on port', PORT));

//Handle unhandled promise rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);
    //close server & exit process
    server.close(()=>process.exit(1));
});