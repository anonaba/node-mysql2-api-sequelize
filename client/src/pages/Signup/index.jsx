import Cookies from 'js-cookie'
import { useEffect, useRef, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import axios from '../../../axios.js'
// import axios from 'axios'

const Signup = () => {
  const [formdata, setFormdata] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [error, setError] = useState({})
  const onFocus = useRef()

  const { name, email, password } = formdata

  const navigate = useNavigate()

  useEffect(() => {
    onFocus.current.focus()
  }, [])

  useEffect(() => {
    setError('')
  }, [name, email, password])

  const handleChange = (e) => {
    setFormdata((prevData) => ({ ...prevData, [e.target.id]: e.target.value }))
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    if (!name && !email && !password) {
      setError({ name: 'Please enter name', email: 'Please enter email id', password: 'Please enter password' })
      return
    }

    if (!name) {
      setError({ name: 'Please enter name' })
      return
    }

    if (!email) {
      setError({ email: 'Please enter email id' })
      return
    }

    if (!password) {
      setError({ password: 'Please enter password' })
      return
    }

    try {
      const res = await axios.post('/sign-up', formdata, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
      console.log(res.data)
      navigate('/login')
    } catch (error) {
      setError(error.response.data.message)
      console.log('pakita mo ang error', error.response.data)
    }
  }

  const token = Cookies.get('access_token')
  if (token) {
    navigate('/dashboard')
  }

  return (
    <div className="container">
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Full Name
          </label>
          <input ref={onFocus} type="text" className="form-control" id="name" aria-describedby="emailHelp" value={name} onChange={handleChange} />
          {error && (
            <>
              <small>{error.name}</small>
            </>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={handleChange} />
          {error && (
            <>
              <small>{error.email}</small>
            </>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="password" value={password} onChange={handleChange} />
          {error && (
            <>
              <small>{error.password}</small>
            </>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Signup
