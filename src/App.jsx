import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Footer from './components/Footer.jsx';
import Producto from './components/Producto.jsx';
import RegistroPopup from './components/RegistroPopup.jsx';
import LoginPopup from './components/LoginPopup.jsx';

function App() {
  // Estado global para el carrito
  const [carrito, setCarrito] = useState([]);
  
  // Función para agregar productos al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito(prevCarrito => {
      const existente = prevCarrito.find(item => item.id === producto.id);
      if (existente) {
        return prevCarrito.map(item => 
          item.id === producto.id 
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  return (
    <div className="App">
      <Navbar carrito={carrito} setCarrito={setCarrito} />
      <Home agregarAlCarrito={agregarAlCarrito} />
      <LoginPopup />
      <Producto />
      <RegistroPopup />
      <Footer />
    </div>
  );
}

export default App;
