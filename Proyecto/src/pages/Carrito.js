import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // <--- 1. Importa el hook

// --- 2. ELIMINA 'initialItems' ---
// const initialItems = [ ... ];

function Carrito() {
  // 3. Obtén todo lo necesario del Contexto
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  
  // 4. ELIMINA el estado local de 'items'
  // const [items, setItems] = useState(initialItems);
  
  const [summary, setSummary] = useState({ subtotal: 0, envio: 0, total: 0 });

  useEffect(() => {
    // 5. Basa el cálculo en 'cartItems' (del contexto)
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const envio = subtotal > 50000 ? 0 : 4500;
    const total = subtotal + envio;
    setSummary({ subtotal, envio, total });
  }, [cartItems]); // <--- Depende de 'cartItems'

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
  };

  // 6. Funciones que llaman al contexto
  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, Number.parseInt(newQuantity));
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  // 7. Renderizado condicional basado en 'cartItems'
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

  // 8. El resto de tu JSX de Carrito
  return (
    <main className="container my-5">
      {/* ... (Encabezado "Tu Carrito") ... */}
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table align-middle">
                  {/* ... (Tu <thead>) ... */}
                  <tbody>
                    {/* 9. Mapea sobre 'cartItems' del contexto */}
                    {cartItems.map(item => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img src={item.image || 'https://placehold.co/60'} alt={item.name} width="60" className="me-3 rounded"/>
                            {item.name}
                          </div>
                        </td>
                        <td>{formatCurrency(item.price)}</td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
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

        {/* ... (Tu columna de Resumen del Pedido) ... */}
        
      </div>
    </main>
  );
}

export default Carrito;