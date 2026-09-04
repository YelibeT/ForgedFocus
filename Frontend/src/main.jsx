import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import CreateAccount from './CreateAccount'
import SignIn from './SignIn'
import './index.css'

const RootPage = window.location.pathname === '/signin' ? SignIn : window.location.pathname === '/create-account' ? CreateAccount : App

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootPage />
  </React.StrictMode>,
)
