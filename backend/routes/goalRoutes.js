const express = require('express')
const router = express.Router()
const {getGoals, addGoals, editGoal, deleteGoal } = require('../controllers/goalController')


router.route('/').get(getGoals).post(addGoals)
router.route('/:id').put(editGoal).delete(deleteGoal)

module.exports = router 