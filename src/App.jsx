import './index.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabase.js'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// pages

import Login from './pages/login.jsx' // new login page
import Home from './pages/Home.jsx'



export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) return <div className="text-center mt-20 text-gray-500">Loading...</div>

  return (
    <BrowserRouter>
      <Routes>
        {!session ? (
          <Route path="*" element={<Login />} />
        ) : (
          <>
            <Route path="/" element={<Home />} />
            
            
            
            
          </>
        )}
      </Routes>
    </BrowserRouter>
  )
}