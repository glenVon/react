import React from 'react';
import Producto from '../components/Producto';

// Datos de productos (podrían venir de una API)

const productos = [
  {
    id: 1, 
    nombre: "new mutants combate el futuro 3 de 3", 
    precio: 5990,
    imagen: "./assets/covers/new mutants combate el futuro 3 de 3.jpg",
    enlace: "/assets/comic/x-men primera clase/X Men First Class 1.pdf"
  },
  {
    id: 2, 
    nombre: "patrulla x especie en peligro 13", 
    precio: 8990,
    imagen: "./assets/covers/patrulla x especie en peligro 13.jpg"
  },
  // ... agregar el resto de los productos
];

const Home = ({ agregarAlCarrito }) => {
  return (
    <div className="contenedor">
      {productos.map(producto => (
        <Producto 
          key={producto.id} 
          producto={producto} 
          agregarAlCarrito={agregarAlCarrito} 
        />
      ))}
    </div>
  );
};

export default Home;