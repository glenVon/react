// src/components/RegistroPopup.jsx
import React, { useState } from 'react';

const RegistroPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errores, setErrores] = useState({});

  const validarRUT = (rut) => {
    rut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
    if (rut.length < 2) return false;
    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1);
    if (!/^\d+$/.test(cuerpo)) return false;
    
    let suma = 0, multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo[i]) * multiplo;
      multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }
    
    const dvEsperado = 11 - (suma % 11);
    let dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
    return dvCalculado === dv;
  };

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

    // Validaciones
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/.test(formData.nombre)) {
      nuevosErrores.nombre = "Nombre inválido";
    }

    if (!validarRUT(formData.rut)) {
      nuevosErrores.rut = "RUT inválido";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nuevosErrores.email = "Email inválido";
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(formData.password)) {
      nuevosErrores.password = "Debe tener 8+ caracteres, mayúscula, minúscula, número y símbolo";
    }

    if (formData.password !== formData.confirmPassword) {
      nuevosErrores.confirmPassword = "Las contraseñas no coinciden";
    }

    if (Object.keys(nuevosErrores).length === 0) {
      let mensaje = "¡Registro exitoso!";
      if (formData.email.endsWith("@duocuc.cl")) {
        mensaje += " ¡Tienes 20% de descuento de por vida!";
      }
      alert(mensaje);
      onClose();
    } else {
      setErrores(nuevosErrores);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <form onSubmit={handleSubmit}>
          <h2>Formulario de Registro</h2>
          
          <label htmlFor="nombre">Nombre:</label>
          <input 
            type="text" 
            id="nombre" 
            name="nombre" 
            value={formData.nombre}
            onChange={handleChange}
          />
          {errores.nombre && <span className="error">{errores.nombre}</span>}

          <label htmlFor="rut">RUT:</label>
          <input 
            type="text" 
            id="rut" 
            name="rut" 
            value={formData.rut}
            onChange={handleChange}
          />
          {errores.rut && <span className="error">{errores.rut}</span>}

          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
          />
          {errores.email && <span className="error">{errores.email}</span>}

          <label htmlFor="password">Contraseña:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={formData.password}
            onChange={handleChange}
          />
          {errores.password && <span className="error">{errores.password}</span>}

          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword" 
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errores.confirmPassword && <span className="error">{errores.confirmPassword}</span>}

          <button type="submit">Registrarse</button>
        </form>
        <button className="cerrarPopup" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default RegistroPopup; // ✅ Exportación correcta