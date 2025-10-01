import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './pages/Home.jsx'
import LoginPopup from './components/LoginPopup.jsx'
import Navbar from './components/Navbar.jsx'
import RegistroPopup from './components/RegistroPopup.jsx'
import Producto from './components/Producto.jsx'
import CarritoPopup from './components/CarritoPopup.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Home/>
    <LoginPopup/>
    <CarritoPopup/>
    <Navbar/>
    <Producto/>
    <RegistroPopup/>
  </React.StrictMode>,
)