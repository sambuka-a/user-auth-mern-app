const asyncHandler = require('express-async-handler')

const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({message: 'Get goals'})
})

const addGoals = asyncHandler(async (req, res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error('please add text field')
  }
  res.status(200).json({message: 'Set goal'})
})

const editGoal = asyncHandler(async (req, res) => {
  res.status(200).json({message: `Update goal ${req.params.id}`})
})

const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({message: `Delete goal ${req.params.id}`})
})

module.exports = {
  getGoals,
  addGoals,
  editGoal,
  deleteGoal,
}