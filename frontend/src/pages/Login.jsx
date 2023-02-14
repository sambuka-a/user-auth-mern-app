import {useState, useEffect} from 'react'
import { FaSignInAlt } from 'react-icons/fa'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const {email, password} = formData

  const formHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const submitHandler = () => {

  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt/> Login
        </h1>
        <p>Log in</p>
      </section>
      <section>
        <form onSubmit={submitHandler}>
          <div className='form-group'>
            <input 
              type='text' 
              className='form-control' 
              id='email' 
              name='email'
              value={email}
              placeholder='Enter Your email'
              onChange={formHandler}  
            />
          </div>
          <div className='form-group'>
            <input 
              type='password' 
              className='form-control' 
              id='password' 
              name='password'
              value={password}
              placeholder='password'
              onChange={formHandler}  
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login