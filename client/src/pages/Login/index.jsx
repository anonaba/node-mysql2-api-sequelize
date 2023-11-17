import Cookies from 'js-cookie'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import AuthContext from '../../context/AuthProvider'

import axios from '../../../axios'
import Loader from '../../components/Loader'
import useAuth from '../../hooks/useAuth'

const Login = () => {
  // const { setAuth } = useContext(AuthContext)
  const { setAuth } = useAuth()
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const [login, setLogin] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const { email, password } = login

  const onFocus = useRef()

  useEffect(() => {
    onFocus.current.focus()
  }, [])

  useEffect(() => {
    setError('')
  }, [email, password])

  const handleChange = (e) => {
    setLogin((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }
  const handleOnSubmit = async (e) => {
    e.preventDefault()

    //guard clause
    if (!email && !password) {
      setError({ email: 'Please enter email', password: 'Please enter password dont be stuborn' })
      return
    }

    if (!email) {
      setError({ email: 'Please enter email' })
      return
    }

    if (!password) {
      setError({ password: 'Please enter password dont be stuborn' })
      return
    }
    setSuccess(true)
    try {
      const response = await axios.post('/login', login, { withCredentials: true })
      const { name } = response.data.others
      const token = response?.data?.access_token
      Cookies.set('access_token', token, { expires: 7, sameSite: 'strict' })
      setAuth({ name, email, token })
      setSuccess(false)
      navigate('/dashboard')
    } catch (error) {
      // console.log(error.response)
      setError({ formError: error.response.data.message })
      if (!error?.response) {
        console.log('No Server Response')
      } else if (error.response?.status === 400) {
        console.log('Missing Username or Password')
      } else if (error.response?.status === 401) {
        console.log('Unauthorized')
      } else {
        console.log('Login Failed')
      }
    } finally {
      setSuccess(false)
    }
  }

  const token = Cookies.get('access_token')
  if (token) {
    navigate('/dashboard')
  }

  return (
    <div className="container">
      {success ? (
        <Loader />
      ) : (
        <>
          <form onSubmit={handleOnSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input ref={onFocus} type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={handleChange} />

              {error ? <small>{error.email}</small> : ''}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input type="password" className="form-control" id="password" value={password} onChange={handleChange} />
              {error ? <small>{error.password}</small> : ''}
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            {error ? error.formError : ''}
          </form>

          <Link to="/dashboard/calendar">Dashboard</Link>

          <div className="text-center">
            <Link to="/sign-up" className="btn btn-success">
              Sign Up
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default Login
