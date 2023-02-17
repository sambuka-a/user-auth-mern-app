const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


//Create user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler (async (req, res) => {
  const {name, email, password} = req.body

  if(!name || !email || !password) {
    res.status(400)
    throw new Error("Please fill all required fields")
  }

  //Check if user exist
  const existedUser = await User.findOne({email})

  if(existedUser) {
    res.status(400)
    throw new Error("User already exist")
  }

  //Hash password 
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  if(user) {
    res.status(201).json({
      //_id: user.id,
      //name: user.name,
      //email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

//Authenticate user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body

  //Check for user email
  const user = await User.findOne({email})

  if(user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

//Get user data
// @route   GET /api/users/getUSer
// @access  Private
const getUserData = asyncHandler (async (req, res) => {
  res.status(200).json(req.user)
})

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getUserData,
}