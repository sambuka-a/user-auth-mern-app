import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import Spinner from '../components/Spinner'

import {register, reset} from '../features/auth/auth-slice'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const {name, email, password, confirmPassword} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const formHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault()

    if(password !== confirmPassword) {
      toast.error('Password do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }
      dispatch(register(userData))
    }
  }

  if(isLoading) {
    return <Spinner/>
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