import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Datos de ejemplo. En una aplicación real, esto vendría de un estado global (Context API o Redux).
const initialItems = [
  { id: 1, name: 'Perfume "Good Girl"', price: 85000, quantity: 1, image: 'https://placehold.co/100x100/d1c4e9/4a148c?text=Good+Girl' },
  { id: 2, name: 'Perfume "212 VIP"', price: 78000, quantity: 2, image: 'https://placehold.co/100x100/d1c4e9/4a148c?text=212+VIP' },
  { id: 3, name: 'Perfume "Armani Code"', price: 92000, quantity: 1, image: 'https://placehold.co/100x100/c7a5c8/4a148c?text=Armani+Code' },
];

function Carrito() {
  // 1. Estado para manejar los artículos del carrito
  const [items, setItems] = useState(initialItems);
  
  // 2. Estado para el resumen del pedido
  const [summary, setSummary] = useState({ subtotal: 0, envio: 0, total: 0 });

  // 3. Efecto para recalcular el total cada vez que los artículos cambien
  useEffect(() => {
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const envio = subtotal > 50000 ? 0 : 4500; // Envío gratis sobre $50.000
    const total = subtotal + envio;
    setSummary({ subtotal, envio, total });
  }, [items]);

  // Formateador de moneda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
  };

  // 4. Funciones para manipular el carrito
  const handleQuantityChange = (id, newQuantity) => {
    // Evita cantidades menores a 1
    if (newQuantity < 1) return; 
    setItems(items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setItems([]);
  };

  // 5. Renderizado condicional: si el carrito está vacío, muestra un mensaje
  if (items.length === 0) {
    return (
      <div className="container text-center my-5 py-5">
        <h2 className="text-purple mb-4">Tu Carrito está Vacío</h2>
        <p className="mb-4">Parece que aún no has añadido ningún producto.</p>
        <Link to="/tienda" className="btn btn-purple btn-lg">
          Ir a la Tienda
        </Link>
      </div>
    );
  }

  // Renderizado principal si hay artículos en el carrito
  return (
    <main className="container my-5">
      <h2 className="text-purple mb-4">Tu Carrito de Compras</h2>
      <div className="row">
        {/* Columna de la tabla de productos */}
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th style={{ minWidth: '120px' }}>Cantidad</th>
                      <th>Subtotal</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* 6. Mapeo de los artículos para crear las filas de la tabla */}
                    {items.map(item => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img src={item.image} alt={item.name} width="60" className="me-3 rounded"/>
                            {item.name}
                          </div>
                        </td>
                        <td>{formatCurrency(item.price)}</td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                            min="1"
                          />
                        </td>
                        <td>{formatCurrency(item.price * item.quantity)}</td>
                        <td>
                          <button onClick={() => handleRemoveItem(item.id)} className="btn btn-sm btn-outline-danger">
                            &times;
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <Link to="/tienda" className="btn btn-outline-purple">
                  Seguir Comprando
                </Link>
                <button onClick={handleClearCart} className="btn btn-outline-danger">
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Columna del resumen del pedido */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-purple text-white">
              <h5 className="mb-0">Resumen del Pedido</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>{formatCurrency(summary.subtotal)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Envío:</span>
                <span>{summary.envio === 0 ? 'Gratis' : formatCurrency(summary.envio)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3 h5">
                <strong>Total:</strong>
                <strong>{formatCurrency(summary.total)}</strong>
              </div>
              <div className="d-grid">
                <button className="btn btn-purple btn-lg">Proceder al Pago</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Carrito;
