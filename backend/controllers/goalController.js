const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({user: req.user.id})

  res.status(200).json(goals)
})

const addGoals = asyncHandler(async (req, res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error('please add text field')
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(goal)
})

const editGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  
  if(!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  const user = await User.findById(req.user.id)

  //check if user exist
  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }

  //chekc if logged in user matches goal user
  if(goal.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

  res.status(200).json(updatedGoal)
})

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  
  if(!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  const user = await User.findById(req.user.id)

  //check if user exist
  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }

  //chekc if logged in user matches goal user
  if(goal.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await Goal.findByIdAndDelete(req.params.id)
  res.status(200).json({id: req.params.id})
})

module.exports = {
  getGoals,
  addGoals,
  editGoal,
  deleteGoal,
}