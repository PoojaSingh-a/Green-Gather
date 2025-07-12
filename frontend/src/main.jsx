import React from 'react'
import {ClerkProvider} from '@clerk/clerk-react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey='pk_test_bW9kZXJuLWFzcC05NC5jbGVyay5hY2NvdW50cy5kZXYk'>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ClerkProvider>
)
