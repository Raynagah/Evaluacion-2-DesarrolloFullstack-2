// --- 1. Importar useState, useEffect y useCart ---
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Para leer el carrito
import '../styles/pago.css'; // Reutilizamos los mismos estilos

// --- 2. Función para formatear moneda ---
const formatCurrency = (value) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);

function PagoError() {
  // --- 3. Obtener los items del carrito (que no se borraron) ---
  const { cartItems } = useCart();

  // --- 4. Copiar la lógica de cálculo de resumen ---
  // (La misma que usas en Comprar.js para que los totales coincidan)
  const [summary, setSummary] = useState({ subtotal: 0, envio: 0, total: 0 });

  useEffect(() => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const envio = subtotal > 50000 ? 0 : 4500;
    const total = subtotal + envio;
    setSummary({ subtotal, envio, total });
  }, [cartItems]);
  // --------------------------------------------------

  return (
    <div className="container my-5 py-5">
      <div className="row justify-content-center">
        {/* Usamos col-lg-8 para darle más espacio al resumen */}
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 p-4 p-md-5 text-center">
            
            <i className="bi bi-x-circle-fill text-danger display-1 mb-4"></i>
            <h1 className="display-4 text-danger mb-3">Error en el Pago</h1>
            <p className="lead mb-4">Lo sentimos, no pudimos procesar tu pago. Por favor, revisa los detalles de tu orden e intenta de nuevo.</p>

            {/* --- 5. SECCIÓN DE RESUMEN DE COMPRA FALLIDA --- */}
            {cartItems.length > 0 && (
              <div className="resumen-fallido-card my-4 text-start">
                <h5 className="text-center text-purple mb-3">Resumen del Pedido</h5>
                
                <ul className="list-group list-group-flush">
                  {/* --- Items --- */}
                  {cartItems.map(item => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <span>{item.name} (x{item.quantity})</span>
                      <span className="fw-bold">{formatCurrency(item.price * item.quantity)}</span>
                    </li>
                  ))}
                  
                  {/* --- Totales --- */}
                  <li className="list-group-item d-flex justify-content-between align-items-center border-top pt-3">
                    <span>Subtotal</span>
                    <span className="fw-bold">{formatCurrency(summary.subtotal)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span>Envío</span>
                    <span className="fw-bold">
                      {summary.envio === 0 ? "Gratis" : formatCurrency(summary.envio)}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center text-purple fs-5">
                    <span className="fw-bold">Total</span>
                    <span className="fw-bold">{formatCurrency(summary.total)}</span>
                  </li>
                </ul>
              </div>
            )}
            {/* --- FIN DE LA SECCIÓN DE RESUMEN --- */}

            <div className="d-grid gap-2 col-md-8 mx-auto mt-4">
              {/* El botón "Intentar de Nuevo" ahora lleva a /comprar, no al carrito,
                  ya que el carrito sigue lleno. */}
              <Link to="/comprar" className="btn btn-purple btn-lg">Intentar de Nuevo</Link>
              <Link to="/contacto" className="btn btn-outline-secondary">Contactar Soporte</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PagoError;