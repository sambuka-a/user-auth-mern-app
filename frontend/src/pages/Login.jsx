import {useState, useEffect} from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'

import {login, reset} from '../features/auth/auth-slice'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  const {email, password} = formData

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

    const userData = {
      email,
      password
    }

    dispatch(login(userData))
  }

  if(isLoading) {
    return <Spinner/>
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