import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Datos de ejemplo de los productos. En una app real, esto vendría de una API.
const initialProducts = [
  { id: 1, name: 'Perfume "Good Girl"', price: 85000, image: 'https://placehold.co/300x300/d1c4e9/4a148c?text=Good+Girl' },
  { id: 2, name: 'Perfume "212 VIP"', price: 78000, image: 'https://placehold.co/300x300/d1c4e9/4a148c?text=212+VIP' },
  { id: 3, name: 'Perfume "Armani Code"', price: 92000, image: 'https://placehold.co/300x300/d1c4e9/4a148c?text=Armani+Code' },
  { id: 4, name: 'Perfume "CH"', price: 75000, image: 'https://placehold.co/300x300/d1c4e9/4a148c?text=CH' },
  { id: 5, name: 'Perfume "Bad Boy"', price: 89000, image: 'https://placehold.co/300x300/d1c4e9/4a148c?text=Bad+Boy' },
  { id: 6, name: 'Perfume "Polo Blue"', price: 95000, image: 'https://placehold.co/300x300/d1c4e9/4a148c?text=Polo+Blue' },
];

function Tienda() {
  const [productos] = useState(initialProducts);

  // Formateador de moneda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
  };

  // En una aplicación real, esta función añadiría el producto a un estado global del carrito.
  const handleAddToCart = (producto) => {
    console.log(`${producto.name} añadido al carrito!`);
    alert(`Has añadido ${producto.name} al carrito.`);
  };

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center mb-5 text-purple">Nuestros Perfumes</h2>
        <div className="row g-4">
          {productos.map(producto => (
            <div key={producto.id} className="col-lg-4 col-md-6">
              <div className="card h-100 shadow-sm border-0 product-card">
                <img src={producto.image} className="card-img-top" alt={producto.name} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-purple">{producto.name}</h5>
                  <p className="card-text h4 text-muted">{formatCurrency(producto.price)}</p>
                  <button 
                    onClick={() => handleAddToCart(producto)} 
                    className="btn btn-purple mt-auto"
                  >
                    Añadir al Carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Tienda;
