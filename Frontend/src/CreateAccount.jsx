import { useState } from 'react'
import { ArrowRight, Code2, Eye, EyeOff, Flame, ShieldCheck } from 'lucide-react'

function CreateAccount() {
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessage('Your account is ready to be created.')
  }

  return (
    <main className="signin-page">
      <section className="signin-intro">
        <div className="brand signin-brand"><span className="brand-mark"><Flame size={18} strokeWidth={2.4} /></span><span>forged<span>focus</span></span></div>
        <div className="intro-copy"><p className="eyebrow">YOUR ATTENTION, FORGED</p><h1>Build a practice<br /><em>that lasts.</em></h1><p className="intro-subcopy">Turn good intentions into a rhythm of focused work, measured honestly and protected daily.</p></div>
        <div className="intro-footer"><span className="intro-rule"></span><span>Start with one focused hour.</span></div>
      </section>

      <section className="signin-panel" aria-labelledby="create-account-title">
        <div className="signin-form-wrap">
          <div className="mobile-brand brand signin-brand"><span className="brand-mark"><Flame size={18} strokeWidth={2.4} /></span><span>forged<span>focus</span></span></div>
          <div className="signin-heading"><p className="eyebrow">GET STARTED</p><h2 id="create-account-title">Create your account</h2><p>Set up your personal focus space.</p></div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Your name</label>
            <input id="name" type="text" placeholder="Alex Kim" autoComplete="name" required />
            <label htmlFor="create-email" className="create-label">Email address</label>
            <input id="create-email" type="email" placeholder="you@example.com" autoComplete="email" required />
            <label htmlFor="create-password" className="create-label">Password</label>
            <div className="password-input"><input id="create-password" type={showPassword ? 'text' : 'password'} placeholder="At least 8 characters" autoComplete="new-password" minLength="8" required /><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((value) => !value)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div>
            <button className="signin-submit" type="submit">Create account <ArrowRight size={16} /></button>
            {message && <p className="signin-message" role="status">{message}</p>}
          </form>
          <div className="signin-divider"><span>OR CONTINUE WITH</span></div>
          <button className="github-button" type="button" onClick={() => setMessage('GitHub sign up selected.')}><Code2 size={17} /> Continue with GitHub</button>
          <p className="signup-prompt">Already have an account? <button type="button" onClick={() => { window.location.href = '/signin' }}>Sign in</button></p>
          <div className="secure-note"><ShieldCheck size={14} /> Your data stays private and secure.</div>
        </div>
      </section>
    </main>
  )
}

export default CreateAccount