import React, { useState } from 'react';
import RegistroPopup from './RegistroPopup.jsx';
import LoginPopup from './LoginPopup.jsx';
import CarritoPopup from './CarritoPopup.jsx';

const Navbar = ({ carrito, setCarrito }) => {
  const [showRegistro, setShowRegistro] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showCarrito, setShowCarrito] = useState(false);

  return (
    <nav className="navbar">
      <img 
        className="ima" 
        src="a (14).png" 
        width="80px" 
        height="80px" 
        alt="logo" 
      />        
      
      <h1 className="titulo">MULTIVERSO COMICS</h1>

      <ul className="nav-links">
        <input 
          type="text" 
          placeholder="Que busca mi estimado.." 
          className="buscar" 
        />
        <input type="submit" value="buscar" className="ir" />

        {/* Botones de registro y login */}
        <button onClick={() => setShowRegistro(true)}>Registrarse</button>
        <button onClick={() => setShowLogin(true)}>Iniciar sesión</button>
        
        {/* Botón para ver el carrito */}
        <button onClick={() => setShowCarrito(true)}>
          Carrito ({carrito.reduce((total, item) => total + item.cantidad, 0)})
        </button>
      </ul>

      {/* Popups modales */}
      {showRegistro && (
        <RegistroPopup onClose={() => setShowRegistro(false)} />
      )}
      
      {showLogin && (
        <LoginPopup onClose={() => setShowLogin(false)} />
      )}
      
      {showCarrito && (
        <CarritoPopup 
          carrito={carrito} 
          setCarrito={setCarrito}
          onClose={() => setShowCarrito(false)} 
        />
      )}
    </nav>
  );
};

export default Navbar;