const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({user: req.user.id})

  res.status(200).json(goals)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
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

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const editGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  
  if(!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  //check if user exist
  if(!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  //chekc if logged in user matches goal user
  if(goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

  res.status(200).json(updatedGoal)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  
  if(!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }


  //check if user exist
  if(!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  //chekc if logged in user matches goal user
  if(goal.user.toString() !== req.user.id) {
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