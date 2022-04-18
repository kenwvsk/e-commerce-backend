const User = require('../models/User.js');

//@desc     Login
//@route    POST /api/v1/user/login
//@access   Private

const login = async (req,res,next) => {
  try {
    const { email, password } = req.body
    // Validate email & password
    if(!email || !password) {
      throw new Error('Plese input username or password')
    }
    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: 'Invalid credentials' });
    }
    // Check if password matches
    if (password !== user.password) {
      return res
        .status(401)
        .json({ success: false, msg: 'Invalid credentials' });
    }
    return res.status(200).json({sucess: true, msg: `Login successfully : ${user.email}`})
  } catch (err) {
    console.log(err.message);
    res.status(400).json({success: false, errorcode: err.status, msg: err.message})
  }
}

//@desc     Create a User
//@route    POST /api/v1/user
//@access   Private

const createUser = async (req,res,next) => {
  console.log(req.body);
  try {
    const { email, password } = req.body
    if(!email || !password) {
      throw new Error('Plese input username or password')
    }
    const user = await User.create({ email, password});
    res.status(201).json({success: true, msg: user});
  } catch(err) {
    console.log(err.message);
    res.status(400).json({success: false, errorcode: err.status, msg: err.message})
  }
}

module.exports = {
  createUser,
  login,
}