import { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'

function App() {

  return (
    <div className='background app'>
    <Navbar className/>
      <Dashboard/>
    </div>
  )
}

export default App
