import React from 'react';
import { useParams, Link } from 'react-router-dom';

// --- Simulación de Base de Datos ---
// En una aplicación real, estos datos vendrían de una API o un estado global.
const allProducts = [
  { id: 1, name: 'Perfume "Good Girl"', price: 85000, normalPrice: 95000, image: 'https://placehold.co/400x400/d1c4e9/4a148c?text=Good+Girl', genero: 'Femenino', tipo: 'Eau de Parfum' },
  { id: 2, name: 'Perfume "212 VIP"', price: 78000, normalPrice: 88000, image: 'https://placehold.co/400x400/d1c4e9/4a148c?text=212+VIP', genero: 'Femenino', tipo: 'Eau de Toilette' },
  { id: 3, name: 'Perfume "Armani Code"', price: 92000, normalPrice: 102000, image: 'https://placehold.co/400x400/d1c4e9/4a148c?text=Armani+Code', genero: 'Masculino', tipo: 'Eau de Parfum' },
  { id: 4, name: 'Perfume "CH"', price: 75000, normalPrice: 85000, image: 'https://placehold.co/400x400/d1c4e9/4a148c?text=CH', genero: 'Femenino', tipo: 'Eau de Toilette' },
  { id: 5, name: 'Perfume "Bad Boy"', price: 89000, normalPrice: 99000, image: 'https://placehold.co/400x400/d1c4e9/4a148c?text=Bad+Boy', genero: 'Masculino', tipo: 'Eau de Parfum' },
  { id: 6, name: 'Perfume "Polo Blue"', price: 95000, normalPrice: 105000, image: 'https://placehold.co/400x400/d1c4e9/4a148c?text=Polo+Blue', genero: 'Masculino', tipo: 'Eau de Toilette' },
];
// ------------------------------------

function DetalleProducto() {
  // 1. useParams() lee los parámetros de la URL. Si tu ruta es "/producto/:id",
  //    extraerá el valor de "id".
  const { id } = useParams();

  // 2. Buscamos el producto en nuestra "base de datos" usando el ID de la URL.
  //    Usamos parseInt porque el ID de la URL es un string.
  const producto = allProducts.find(p => p.id === parseInt(id));

  // Formateador de moneda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
  };

  // 3. Si el producto no se encuentra, mostramos un mensaje.
  if (!producto) {
    return (
      <div className="container my-5 text-center">
        <h2>Producto no encontrado</h2>
        <p>El perfume que buscas no existe o fue removido.</p>
        <Link to="/tienda" className="btn btn-purple">Volver a la Tienda</Link>
      </div>
    );
  }

  // Lógica para añadir al carrito
  const handleAddToCart = () => {
    console.log(`${producto.name} añadido al carrito!`);
    alert(`Has añadido ${producto.name} al carrito.`);
  };

  // 4. Si el producto se encuentra, renderizamos sus detalles.
  return (
    <main className="container my-5">
      <div className="row align-items-center">
        <div className="col-md-5 text-center">
          <img src={producto.image} alt={producto.name} className="img-fluid rounded shadow" />
        </div>
        <div className="col-md-7">
          <h2 className="text-purple fw-bold">{producto.name}</h2>
          <p><strong>Género:</strong> {producto.genero}</p>
          <p><strong>Tipo:</strong> {producto.tipo}</p>
          <p className="text-decoration-line-through text-muted">{formatCurrency(producto.normalPrice)}</p>
          <p className="fs-3 fw-bold text-danger">{formatCurrency(producto.price)}</p>
          <div className="d-flex gap-3 mt-4">
            <button onClick={handleAddToCart} className="btn btn-purple btn-lg">Agregar al Carrito</button>
            <Link to="/tienda" className="btn btn-outline-purple btn-lg">Volver a la Tienda</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DetalleProducto;

