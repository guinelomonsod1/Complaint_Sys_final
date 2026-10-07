import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Sidebar() {
  const { user, signOut } = useAuth()

  const linkClass = ({ isActive }) =>
    `block rounded-lg px-4 py-3 text-sm font-medium transition ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 hover:bg-gray-100'
    }`

  return (
    <aside className="fixed inset-y-0 left-0 z-20 w-64 border-r bg-white">
      <div className="border-b px-6 py-5">
        <h1 className="text-lg font-bold text-gray-900">
          Complaint System
        </h1>

        <p className="mt-1 text-xs text-gray-500">
          Citizen Feedback & Management
        </p>
      </div>

      <nav className="space-y-2 p-4">
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>

        {user?.role === 'Citizen' && (
          <>
            <NavLink to="/complaints/new" className={linkClass}>
              New Complaint
            </NavLink>

            <NavLink to="/complaints" className={linkClass}>
              My Complaints
            </NavLink>

            <NavLink to="/notifications" className={linkClass}>
              Notifications
            </NavLink>

            <NavLink to="/feedback" className={linkClass}>
              Feedback
            </NavLink>
          </>
        )}

        {user?.role === 'LGU Staff' && (
          <NavLink to="/staff/complaints" className={linkClass}>
            Complaints
          </NavLink>
        )}

        {user?.role === 'Department Head' && (
          <NavLink to="/department/complaints" className={linkClass}>
            Department Complaints
          </NavLink>
        )}

        {user?.role === 'Assigned Personnel' && (
          <NavLink to="/assigned/complaints" className={linkClass}>
            My Assignments
          </NavLink>
        )}

        {user?.role === 'System Administrator' && (
          <>
            <NavLink to="/admin/users" className={linkClass}>
              Users
            </NavLink>

            <NavLink to="/admin/settings" className={linkClass}>
              System Settings
            </NavLink>
          </>
        )}

        <button
          type="button"
          onClick={signOut}
          className="mt-8 w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"
        >
          Sign Out
        </button>
      </nav>
    </aside>
  )
}

export default Sidebar