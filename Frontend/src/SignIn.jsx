import { useState } from 'react'
import { ArrowRight, Code2, Eye, EyeOff, Flame, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function SignIn() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    setMessage('Signing you in...')

    try {
      const response = await fetch('http://localhost:8800/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setMessage(data.message || 'Sign in failed.')
        return
      }

      setMessage('Welcome back. Preparing your workspace...')
      navigate('/dashboard')
    } catch (error) {
      console.error(error)
      setMessage('Unable to connect to the server.')
    }
  }

  return (
    <main className="signin-page">
      <section className="signin-intro">
        <div className="brand signin-brand">
          <span className="brand-mark">
            <Flame size={18} strokeWidth={2.4} />
          </span>

          <span>
            forged<span>focus</span>
          </span>
        </div>

        <div className="intro-copy">
          <p className="eyebrow">YOUR ATTENTION, FORGED</p>

          <h1>
            Make space for
            <br />
            <em>deep work.</em>
          </h1>

          <p className="intro-subcopy">
            A calmer way to understand your time, protect your focus, and make
            progress that compounds.
          </p>
        </div>

        <div className="intro-footer">
          <span className="intro-rule"></span>
          <span>Intentional work starts here.</span>
        </div>
      </section>

      <section className="signin-panel" aria-labelledby="signin-title">
        <div className="signin-form-wrap">
          <div className="mobile-brand brand signin-brand">
            <span className="brand-mark">
              <Flame size={18} strokeWidth={2.4} />
            </span>

            <span>
              forged<span>focus</span>
            </span>
          </div>

          <div className="signin-heading">
            <p className="eyebrow">WELCOME BACK</p>

            <h2 id="signin-title">Sign in to your space</h2>

            <p>Pick up where you left off.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email address</label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />

            <div className="password-label">
              <label htmlFor="password">Password</label>

              <button
                type="button"
                onClick={() =>
                  setMessage('Password reset link requested.')
                }
              >
                Forgot password?
              </button>
            </div>

            <div className="password-input">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                aria-label={
                  showPassword ? 'Hide password' : 'Show password'
                }
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>
            </div>

            <button className="signin-submit" type="submit">
              Sign in
              <ArrowRight size={16} />
            </button>

            {message && (
              <p className="signin-message" role="status">
                {message}
              </p>
            )}
          </form>

          <div className="signin-divider">
            <span>OR CONTINUE WITH</span>
          </div>

          <button
            className="github-button"
            type="button"
            onClick={() => setMessage('GitHub sign in selected.')}
          >
            <Code2 size={17} />
            Continue with GitHub
          </button>

          <p className="signup-prompt">
            New to ForgedFocus?{' '}
            <button
              type="button"
              onClick={() => {
                navigate('/create-account')
              }}
            >
              Create an account
            </button>
          </p>

          <div className="secure-note">
            <ShieldCheck size={14} />
            Your data stays private and secure.
          </div>
        </div>
      </section>
    </main>
  )
}

export default SignIn