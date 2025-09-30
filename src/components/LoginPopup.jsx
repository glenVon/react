// src/components/LoginPopup.jsx
import React, { useState } from 'react';

const LoginPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    if (errores[e.target.name]) {
      setErrores({
        ...errores,
        [e.target.name]: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = {};

    // Validación de email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nuevosErrores.email = "Email inválido";
    }

    // Validación de contraseña
    if (formData.password.length < 8) {
      nuevosErrores.password = "La contraseña debe tener al menos 8 caracteres";
    }

    if (Object.keys(nuevosErrores).length === 0) {
      alert("¡Login exitoso!");
      onClose();
    } else {
      setErrores(nuevosErrores);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <form onSubmit={handleSubmit}>
          <h2>Iniciar sesión</h2>
          
          <label htmlFor="loginEmail">Email:</label>
          <input 
            type="email" 
            id="loginEmail" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
          {errores.email && <span className="error">{errores.email}</span>}

          <label htmlFor="loginPassword">Contraseña:</label>
          <input 
            type="password" 
            id="loginPassword" 
            name="password" 
            value={formData.password}
            onChange={handleChange}
            required 
          />
          {errores.password && <span className="error">{errores.password}</span>}

          <button type="submit">Entrar</button>
        </form>
        <button className="cerrarPopup" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default LoginPopup; // ✅ Exportación correcta