import { useAuth } from '../context/AuthContext'

function Login() {
  const { signInWithGoogle } = useAuth()

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold">
              C
            </div>

            <div>
              <p className="text-sm font-bold tracking-wide">
                COMPLAINT
              </p>

              <p className="text-xs text-slate-400">
                Management System
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-sm text-slate-300 sm:flex">
            <a
              href="#about"
              className="transition hover:text-white"
            >
              About
            </a>

            <a
              href="#features"
              className="transition hover:text-white"
            >
              Features
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute left-1/2 top-0 -z-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />

          <div className="mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-8 lg:py-20">
            {/* Left content */}
            <div className="relative z-10 max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                Citizen Feedback & Complaint Management
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Your voice
                <span className="block text-blue-400">
                  matters.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                Report community concerns, track your complaints,
                and stay informed as your concern moves through
                the proper government office.
              </p>

              {/* Login */}
              <div className="mt-8">
                <button
                  type="button"
                  onClick={signInWithGoogle}
                  className="flex w-full max-w-sm items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 font-semibold text-slate-900 shadow-lg transition hover:bg-slate-100 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950"
                >
                  {/* Google icon */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.805 12.23c0-.79-.07-1.55-.205-2.28H12v4.31h5.5a4.7 4.7 0 0 1-2.04 3.08v2.56h3.3c1.93-1.78 3.045-4.4 3.045-7.67Z"
                      fill="#4285F4"
                    />

                    <path
                      d="M12 22c2.76 0 5.08-.91 6.77-2.47l-3.3-2.56c-.91.61-2.07.97-3.47.97-2.67 0-4.94-1.8-5.75-4.22H2.84v2.64A10.22 10.22 0 0 0 12 22Z"
                      fill="#34A853"
                    />

                    <path
                      d="M6.25 13.72a6.15 6.15 0 0 1 0-3.44V7.64H2.84a10.02 10.02 0 0 0 0 8.72l3.41-2.64Z"
                      fill="#FBBC05"
                    />

                    <path
                      d="M12 6.06c1.5 0 2.84.52 3.9 1.53l2.92-2.92C17.08 3.04 14.76 2 12 2a10.22 10.22 0 0 0-9.16 5.64l3.41 2.64C7.06 7.86 9.33 6.06 12 6.06Z"
                      fill="#EA4335"
                    />
                  </svg>

                  Continue with Google
                </button>

                <p className="mt-4 max-w-sm text-center text-xs text-slate-500">
                  Sign in securely using your Google account.
                </p>
              </div>
            </div>

            {/* Right visual */}
            <div className="relative z-10 hidden lg:block">
              <div className="relative mx-auto max-w-lg">
                {/* Main card */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
                  <div className="rounded-2xl bg-white p-6 text-slate-900">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-slate-500">
                          Complaint Status
                        </p>

                        <h3 className="mt-1 text-xl font-bold">
                          Community Concern
                        </h3>
                      </div>

                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                        IN PROGRESS
                      </span>
                    </div>

                    <div className="mt-8">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>Submitted</span>
                        <span>Processing</span>
                        <span>Resolved</span>
                      </div>

                      <div className="mt-3 h-2 rounded-full bg-slate-200">
                        <div className="h-2 w-2/3 rounded-full bg-blue-600" />
                      </div>
                    </div>

                    <div className="mt-8 space-y-3">
                      <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600">
                          ✓
                        </div>

                        <div>
                          <p className="text-sm font-semibold">
                            Complaint submitted
                          </p>

                          <p className="text-xs text-slate-500">
                            Your concern has been received.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          •
                        </div>

                        <div>
                          <p className="text-sm font-semibold">
                            Being processed
                          </p>

                          <p className="text-xs text-slate-500">
                            The responsible office is handling it.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating card */}
                <div className="absolute -bottom-6 -left-8 rounded-2xl border border-white/10 bg-slate-900 p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                      ✓
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        Transparent tracking
                      </p>

                      <p className="text-xs text-slate-400">
                        Stay updated on your complaint
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="border-t border-white/10 bg-slate-900"
        >
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-xl text-blue-400">
                  +
                </div>

                <h3 className="font-semibold">
                  Submit Complaints
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Easily report community concerns and provide
                  the information needed for proper handling.
                </p>
              </div>

              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-xl text-blue-400">
                  ↗
                </div>

                <h3 className="font-semibold">
                  Track Progress
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Monitor the status of your complaint from
                  submission through resolution.
                </p>
              </div>

              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-xl text-blue-400">
                  ★
                </div>

                <h3 className="font-semibold">
                  Give Feedback
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Share your experience after your complaint has
                  been handled and resolved.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="border-t border-white/10 bg-slate-950"
        >
          <div className="mx-auto max-w-3xl px-6 py-16 text-center lg:px-8">
            <h2 className="text-2xl font-bold">
              A better way to communicate community concerns
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              The Complaint Management System provides citizens
              with a centralized platform for submitting concerns,
              monitoring complaint progress, and providing
              feedback while helping government personnel manage
              complaints efficiently.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-center text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left lg:px-8">
          <p>
            © 2026 Complaint Management System
          </p>

          <p>
            Citizen Feedback & Complaint Management
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Login