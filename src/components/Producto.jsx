// src/components/Producto.js
import React from 'react';

const Producto = ({ producto, agregarAlCarrito }) => {
  return (
    <div className="producto">
      <div className="producto-overlay">
        <span className="precio">${producto.precio.toLocaleString()}</span>
        <span 
          className="carrito-icono" 
          onClick={() => agregarAlCarrito(producto)}
        >
          🛒
        </span>
      </div>
      <a href={producto.enlace || "/compra.html"}>
        <img 
          className={`a${producto.id}`}
          src={producto.imagen} 
          alt={producto.nombre} 
        />
      </a>
    </div>
  );
};

export default Producto;