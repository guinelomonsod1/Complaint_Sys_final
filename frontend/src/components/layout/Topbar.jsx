import { useAuth } from '../../context/AuthContext'

function Topbar() {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-10 border-b bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Welcome, {user?.first_name}
          </h2>

          <p className="text-xs text-gray-500">
            {user?.role}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold">
              {user?.first_name} {user?.last_name}
            </p>

            <p className="text-xs text-gray-500">
              {user?.email}
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
            {user?.first_name?.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar