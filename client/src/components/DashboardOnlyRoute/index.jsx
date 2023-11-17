import Cookies from 'js-cookie'
import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

function DashboardOnlyRoute({ children }) {
  const { auth } = useAuth()
  const location = useLocation()

  auth.token = Cookies.get('access_token')

  return auth?.email || auth.token ? children : <Navigate to="/login" state={{ from: location }} replace />
  // return children
}

DashboardOnlyRoute.propTypes = {
  children: PropTypes.instanceOf(Object),
}

DashboardOnlyRoute.defaultProps = {
  children: {},
}

export default DashboardOnlyRoute
