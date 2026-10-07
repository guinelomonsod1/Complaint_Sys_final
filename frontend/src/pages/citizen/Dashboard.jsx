import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'
import StatCard from '../../components/ui/StatCard'
import StatusBadge from '../../components/ui/StatusBadge'
import { apiFetch } from '../../lib/api'

function Dashboard() {
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await apiFetch('/citizen/dashboard')
        setDashboard(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  if (loading) {
    return (
      <AppLayout>
        <p className="text-gray-600">
          Loading dashboard...
        </p>
      </AppLayout>
    )
  }

  if (error) {
    return (
      <AppLayout>
        <div className="rounded-lg bg-red-50 p-4 text-red-700">
          {error}
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Overview of your complaints and feedback.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Complaints"
          value={dashboard?.statistics?.total ?? 0}
          description="All complaints submitted"
        />

        <StatCard
          title="Submitted"
          value={dashboard?.statistics?.submitted ?? 0}
          description="Awaiting processing"
        />

        <StatCard
          title="In Progress"
          value={dashboard?.statistics?.in_progress ?? 0}
          description="Currently being handled"
        />

        <StatCard
          title="Resolved"
          value={dashboard?.statistics?.resolved ?? 0}
          description="Successfully resolved"
        />
      </div>

      <div className="mt-8 rounded-xl border bg-white shadow-sm">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="font-semibold text-gray-900">
              Recent Complaints
            </h2>

            <p className="text-sm text-gray-500">
              Your latest submitted complaints
            </p>
          </div>

          <Link
            to="/complaints"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View all
          </Link>
        </div>

        {dashboard?.recent_complaints?.length ? (
          <div className="divide-y">
            {dashboard.recent_complaints.map((complaint) => (
              <Link
                key={complaint.id}
                to={`/complaints/${complaint.id}`}
                className="block px-6 py-4 hover:bg-gray-50"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {complaint.subject}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {complaint.tracking_number}
                    </p>
                  </div>

                  <StatusBadge status={complaint.status} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="px-6 py-10 text-center">
            <p className="text-gray-500">
              You have not submitted any complaints yet.
            </p>

            <Link
              to="/complaints/new"
              className="mt-4 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Submit a Complaint
            </Link>
          </div>
        )}
      </div>
    </AppLayout>
  )
}

export default Dashboard