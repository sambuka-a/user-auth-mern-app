import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {createGoal} from '../features/goals/goals-slice'

const GoalForm = () => {
  const dispatch = useDispatch()

  const [text, setText] = useState('')

  const addGoalHandler = (e) => {
    e.preventDefault()

    dispatch(createGoal({text}))
    setText('')
  }



  return (
    <section className='form'>
      <form onSubmit={addGoalHandler}>
        <div className='form-group'>
          <label htmlFor='text'>Goal</label>
          <input 
            type='text' 
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}  
          />
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-block'>Add goal</button>
        </div>
      </form>
    </section>
  )
}

export default GoalForm