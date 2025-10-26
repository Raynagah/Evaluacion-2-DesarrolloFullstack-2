import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// --- 1. IMPORTAMOS LOS ESTILOS DEL CARRITO ---
import '../styles/carrito.css'; // (Asegúrate de que este archivo CSS exista)

function Carrito() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [summary, setSummary] = useState({ subtotal: 0, envio: 0, total: 0 });

  useEffect(() => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    // Tu lógica de envío está perfecta
    const envio = subtotal > 50000 ? 0 : 4500;
    const total = subtotal + envio;
    setSummary({ subtotal, envio, total });
  }, [cartItems]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
  };

  const handleQuantityChange = (id, newQuantity) => {
    // Evitar cantidades negativas o cero
    const qty = Number.parseInt(newQuantity);
    updateQuantity(id, qty > 0 ? qty : 1);
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  if (cartItems.length === 0) {
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

  return (
    <main className="container my-5">
      <h2 className="text-center mb-5 text-purple">Tu Carrito de Compras</h2>
      <div className="row">
        {/* --- Columna de la Tabla de Productos --- */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-4">
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Total</th>
                      <th>Quitar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map(item => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            {/* Usamos 'producto-img' de carrito.css */}
                            <img src={item.image || 'https://placehold.co/80'} alt={item.name} className="me-3 rounded producto-img" />
                            <div>
                              <span className="fw-bold">{item.name}</span>
                              <br />
                              <small className="text-muted">{item.brand}</small>
                            </div>
                          </div>
                        </td>
                        <td>{formatCurrency(item.price)}</td>
                        <td>
                          {/* Usamos 'cantidad-input' de carrito.css */}
                          <input
                            type="number"
                            className="form-control text-center cantidad-input"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                            min="1"
                          />
                        </td>
                        <td className="fw-bold">{formatCurrency(item.price * item.quantity)}</td>
                        <td>
                          <button onClick={() => handleRemoveItem(item.id)} className="btn btn-sm btn-outline-danger">
                            &times;
                            S           </button>
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

        {/* --- 2. COLUMNA DE RESUMEN (LA PARTE QUE FALTABA) --- */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-purple text-white">
              <h5 className="mb-0">Resumen del Pedido</h5>
            </div>
            <div className="card-body p-4">
              <ul className="list-group list-group-flush mb-3">
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  <span>Subtotal</span>
                  <span className="fw-bold">{formatCurrency(summary.subtotal)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  <span>Envío</span>
                  <span className="fw-bold">
                    {summary.envio === 0 ? "Gratis" : formatCurrency(summary.envio)}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0 border-top pt-3">
                  <h5 className="mb-0 text-purple">Total</h5>
                  <h5 className="mb-0 text-purple fw-bold">{formatCurrency(summary.total)}</h5>
                </li>
              </ul>

              {/* --- 3. BOTÓN PARA IR A PAGAR --- */}
              <div className="d-grid">
                <Link to="/comprar" className="btn btn-purple btn-lg">
                  Ir a Pagar
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Carrito;