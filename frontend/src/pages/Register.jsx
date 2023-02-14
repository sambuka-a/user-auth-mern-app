import {useState, useEffect} from 'react'
import { FaUser } from 'react-icons/fa'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const {name, email, password, confirmPassword} = formData

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
          <FaUser/> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section>
        <form onSubmit={submitHandler}>
          <div className='form-group'>
            <input 
              type='text' 
              className='form-control' 
              id='name' 
              name='name'
              value={name}
              placeholder='Enter Your name'
              onChange={formHandler}  
            />
          </div>
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
            <input 
              type='password' 
              className='form-control' 
              id='confirmPassword' 
              name='confirmPassword'
              value={confirmPassword}
              placeholder='Confirm password'
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

export default Register