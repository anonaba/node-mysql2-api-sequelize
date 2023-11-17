import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Navbar = () => {
  const { auth } = useAuth()

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand" href="#">
          Navbar
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page" href="#">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link" href="#">
                About
              </Link>
            </li>
          </ul>
          {auth?.email ? (
            <div className="d-flex gap-2">
              <Link to="/" className="btn btn-danger">
                Logout
              </Link>
            </div>
          ) : (
            <div className="d-flex gap-2">
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/sign-up" className="btn btn-success">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
