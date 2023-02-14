const express = require('express')
const router = express.Router()
const {getGoals, addGoals, editGoal, deleteGoal } = require('../controllers/goalController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getGoals).post(protect, addGoals)
router.route('/:id').put(protect, editGoal).delete(protect, deleteGoal)

module.exports = router 