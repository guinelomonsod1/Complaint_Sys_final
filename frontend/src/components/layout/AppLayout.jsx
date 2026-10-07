import Sidebar from './Sidebar'
import Topbar from './Topbar'

function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />

      <div className="ml-64 min-h-screen">
        <Topbar />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppLayout