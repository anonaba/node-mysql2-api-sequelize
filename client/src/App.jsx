import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import DashboardOnlyRoute from './components/DashboardOnlyRoute'
import Navbar from './components/Navbar'
import { About, Dashboard, Home, Login, Signup } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />

        {/* dashboard protected route */}
        <Route
          path="/dashboard/*"
          element={
            <DashboardOnlyRoute>
              <Dashboard />
            </DashboardOnlyRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
