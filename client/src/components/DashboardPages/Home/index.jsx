import { Link } from 'react-router-dom'
// import User from '../User'

function Home() {
  return (
    <div>
      <h1>Home Dashboard</h1>
      {/* <User /> */}
      <Link to="/dashboard/calendar">Calendar</Link>
    </div>
  )
}

export default Home
