import axios from "axios";

const API_URL = 'https://user-auth-goal-app.onrender.com/api/goals/'

//create new goal
const addGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  }

  const response = await axios.post(API_URL, goalData, config)

  return response.data
}

//get user goals
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

//delete user goal
const deleteGoal = async (goalId, token) => {
  console.log(goalId, token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  }

  const response = await axios.delete(`${API_URL}${goalId}`, config)

  return response.data
}

const goalService = {
  addGoal,
  getGoals,
  deleteGoal,
}

export default goalService