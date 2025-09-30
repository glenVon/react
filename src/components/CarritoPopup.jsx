// src/components/CarritoPopup.jsx
import React, { useState } from 'react';

const CarritoPopup = ({ carrito, setCarrito, onClose }) => {
  const [mostrarPago, setMostrarPago] = useState(false);
  const [pagoExitoso, setPagoExitoso] = useState(false);
  const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState('');

  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const ajustarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) {
      eliminarDelCarrito(id);
      return;
    }
    
    setCarrito(carrito.map(item => 
      item.id === id ? { ...item, cantidad: nuevaCantidad } : item
    ));
  };

  const procesarPago = (metodo) => {
    setMetodoPagoSeleccionado(metodo);
    
    setTimeout(() => {
      setPagoExitoso(true);
      
      setTimeout(() => {
        setCarrito([]);
        setPagoExitoso(false);
        setMetodoPagoSeleccionado('');
        onClose();
      }, 3000);
    }, 1000);
  };

  if (pagoExitoso) {
    return (
      <div className="popup-overlay">
        <div className="popup-content">
          <h2>¡Pago exitoso!</h2>
          <p>Método de pago: {metodoPagoSeleccionado.toUpperCase()}</p>
          <p>Que disfrutes tus comics :D te llegará al correo la boleta</p>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  if (mostrarPago) {
    return (
      <div className="popup-overlay">
        <div className="popup-content">
          <h2>Selecciona forma de pago</h2>
          <div className="opciones-pago">
            <button onClick={() => procesarPago('débito')}>💳 Débito</button>
            <button onClick={() => procesarPago('crédito')}>💳 Crédito</button>
            <button onClick={() => procesarPago('paypal')}>🔵 PayPal</button>
          </div>
          <button onClick={() => setMostrarPago(false)}>Cancelar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content carrito-content">
        <h2>🛒 Carrito de Compras</h2>
        
        {carrito.length === 0 ? (
          <div className="carrito-vacio">
            <p>El carrito está vacío</p>
            <span>😔</span>
          </div>
        ) : (
          <>
            <div className="items-carrito">
              {carrito.map(item => (
                <div key={item.id} className="item-carrito">
                  <div className="info-item">
                    <span className="nombre-item">{item.nombre}</span>
                    <span className="precio-item">${item.precio.toLocaleString()} c/u</span>
                  </div>
                  
                  <div className="controles-cantidad">
                    <button onClick={() => ajustarCantidad(item.id, item.cantidad - 1)}>-</button>
                    <span className="cantidad">{item.cantidad}</span>
                    <button onClick={() => ajustarCantidad(item.id, item.cantidad + 1)}>+</button>
                  </div>
                  
                  <span className="subtotal">${(item.precio * item.cantidad).toLocaleString()}</span>
                  
                  <button onClick={() => eliminarDelCarrito(item.id)}>🗑️</button>
                </div>
              ))}
            </div>
            
            <div className="resumen-carrito">
              <div className="total-line">
                <span>Total:</span>
                <span className="total-precio">${total.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="acciones-carrito">
              <button onClick={() => setMostrarPago(true)}>Proceder al Pago</button>
              <button onClick={onClose}>Seguir Comprando</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CarritoPopup; // ✅ Exportación correcta