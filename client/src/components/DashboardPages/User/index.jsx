import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import axios from '../../../../axios'
import useAuth from '../../../hooks/useAuth'

const browserCookie = Cookies.get('access_token')
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${browserCookie}`,
  },
}

function User() {
  const { auth } = useAuth()

  const [user, setUser] = useState({ name: '', email: '' })

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios('/profile', config)
        const { name, email } = response.data
        setUser((prev) => ({ ...prev, name, email }))
      } catch (error) {
        console.log(error)
      }
    }

    getProfile()
  }, [])

  return <div>Profile name: {auth.name || user.name}</div>
}

export default User
