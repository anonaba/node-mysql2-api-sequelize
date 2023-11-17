import { Route, Routes } from 'react-router-dom'
import { Calendar, Home } from '../../components/DashboardPages/'

const Dashboard = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="calendar" element={<Calendar />} />
      </Routes>
    </>
  )
}

export default Dashboard
