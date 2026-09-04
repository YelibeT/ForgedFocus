import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import CreateAccount from './CreateAccount'
import SignIn from './SignIn'
import './index.css'

const path = window.location.pathname
const RootPage = path === '/create-account' ? CreateAccount : path === '/dashboard' ? App : SignIn

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootPage />
  </React.StrictMode>,
)
