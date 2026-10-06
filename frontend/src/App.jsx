import { useState } from 'react'
import { useAuth } from './context/AuthContext'
import { apiFetch } from './lib/api'

function App() {
  const {
    session,
    user,
    loading,
    signInWithGoogle,
    signOut,
  } = useAuth()

  const [submitting, setSubmitting] = useState(false)
  const [complaint, setComplaint] = useState(null)
  const [error, setError] = useState(null)

  const submitTestComplaint = async () => {
    setSubmitting(true)
    setComplaint(null)
    setError(null)

    try {
      const data = await apiFetch('/complaints', {
        method: 'POST',
        body: JSON.stringify({
          category_id: 1,
          subject: 'Test complaint from citizen account',
          description:
            'This is a test complaint submitted through the Complaint Management System.',
          location: 'Poblacion',
        }),
      })

      setComplaint(data.complaint)
    } catch (err) {
      console.error('Complaint submission failed:', err)
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>Loading...</p>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="text-2xl font-bold">
            Complaint Management System
          </h1>

          <p className="mt-2 text-gray-600">
            Citizen Feedback and Complaint Management
          </p>

          <button
            type="button"
            onClick={signInWithGoogle}
            className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Continue with Google
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold">
          Complaint Management System
        </h1>

        {user && (
          <div className="mt-6">
            <p className="font-semibold text-green-600">
              Authentication successful! 🎉
            </p>

            <div className="mt-4 space-y-2">
              <p>
                <strong>Name:</strong>{' '}
                {user.first_name} {user.last_name}
              </p>

              <p>
                <strong>Email:</strong> {user.email}
              </p>

              <p>
                <strong>Role:</strong> {user.role}
              </p>

              <p>
                <strong>Barangay:</strong>{' '}
                {user.barangay || 'None'}
              </p>

              <p>
                <strong>Department:</strong>{' '}
                {user.department || 'None'}
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 border-t pt-6">
          <h2 className="text-lg font-semibold">
            Complaint API Test
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            This temporarily submits a test complaint to Laravel.
          </p>

          <button
            type="button"
            onClick={submitTestComplaint}
            disabled={submitting}
            className="mt-4 w-full rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting
              ? 'Submitting...'
              : 'Submit Test Complaint'}
          </button>

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 p-4 text-red-700">
              <strong>Error:</strong> {error}
            </div>
          )}

          {complaint && (
            <div className="mt-4 rounded-lg bg-green-50 p-4">
              <p className="font-semibold text-green-700">
                Complaint submitted successfully! 🎉
              </p>

              <div className="mt-3 space-y-1 text-sm">
                <p>
                  <strong>ID:</strong> {complaint.id}
                </p>

                <p>
                  <strong>Tracking Number:</strong>{' '}
                  {complaint.tracking_number}
                </p>

                <p>
                  <strong>Subject:</strong>{' '}
                  {complaint.subject}
                </p>

                <p>
                  <strong>Status:</strong>{' '}
                  {complaint.status}
                </p>

                <p>
                  <strong>Category:</strong>{' '}
                  {complaint.category}
                </p>

                <p>
                  <strong>Barangay:</strong>{' '}
                  {complaint.barangay}
                </p>
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={signOut}
          className="mt-6 w-full rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default App