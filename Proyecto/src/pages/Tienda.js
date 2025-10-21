import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Datos de ejemplo de los productos.
const initialProducts = [
  { id: 1, name: 'Perfume "Good Girl"', price: 85000, image: 'https://placehold.co/300x300/d1c4e9/4a148c?text=Good+Girl' },
  { id: 2, name: 'Perfume "212 VIP"', price: 78000, image: 'https://placehold.co/300x300/d1c4e9/4a148c?text=212+VIP' },
  { id: 3, name: 'Perfume "Armani Code"', price: 92000, image: 'https://placehold.co/300x300/d1c4e9/4a148c?text=Armani+Code' },
  // ... más productos
];

function Tienda() {
  const [productos] = useState(initialProducts);

  const formatCurrency = (value) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);

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
                {/* --- CAMBIO CLAVE AQUÍ --- */}
                {/* Envolvemos la imagen en un Link para que sea clickeable */}
                <Link to={`/producto/${producto.id}`}>
                  <img src={producto.image} className="card-img-top" alt={producto.name} />
                </Link>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-purple">
                    {/* También el título puede ser un enlace */}
                    <Link to={`/producto/${producto.id}`} className="text-decoration-none text-purple">
                      {producto.name}
                    </Link>
                  </h5>
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

