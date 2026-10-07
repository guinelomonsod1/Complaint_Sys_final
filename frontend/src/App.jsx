import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import { useAuth } from './context/AuthContext'

import Login from './pages/Login'
import CitizenDashboard from './pages/citizen/Dashboard'

function App() {
  const { session, user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC AREA */}
        {!session && (
          <>
            <Route path="/" element={<Login />} />

            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </>
        )}

        {/* AUTHENTICATED AREA */}
        {session && (
          <>
            {user?.role === 'Citizen' && (
              <Route
                path="/dashboard"
                element={<CitizenDashboard />}
              />
            )}

            <Route
              path="/"
              element={<Navigate to="/dashboard" replace />}
            />

            <Route
              path="*"
              element={<Navigate to="/dashboard" replace />}
            />
          </>
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default App