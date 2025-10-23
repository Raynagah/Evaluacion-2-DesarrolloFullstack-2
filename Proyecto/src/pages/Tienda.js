import React, { useState, useEffect } from 'react'; // <--- 1. Importar useEffect
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // <--- 2. Importar el hook del carrito
import { getAllProducts } from '../data/productsAPI'; // <--- 3. Importar tu nueva API

// --- 4. ELIMINAMOS 'initialProducts' de aquí ---
// const initialProducts = [ ... ];

function Tienda() {
  // 5. Nuevos estados: uno para productos, otro para la carga
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 6. Obtenemos la función 'addToCart' del contexto
  const { addToCart } = useCart(); 

  // 7. Usamos useEffect para cargar los datos 1 sola vez
  useEffect(() => {
    // Llamamos a la función de la API (que devuelve una Promesa)
    getAllProducts()
      .then(data => {
        // Cuando los datos llegan, los guardamos en el estado
        setProductos(data);
      })
      .catch(error => {
        // Manejamos un posible error
        console.error("Error al cargar productos:", error);
      })
      .finally(() => {
        // Cuando termina (éxito o error), quitamos el "Cargando"
        setLoading(false);
      });
  }, []); // El array vacío [] asegura que esto se ejecute solo 1 vez

  const formatCurrency = (value) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);

  // 8. ELIMINAMOS la función local 'handleAddToCart'
  // const handleAddToCart = (producto) => { ... };

  // 9. Mostramos un mensaje de "Cargando" mientras 'loading' sea true
  if (loading) {
    return (
      <div className="container text-center my-5 py-5">
        <h2 className="text-purple">Cargando Productos...</h2>
        <div className="spinner-border text-purple" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // 10. Si no está cargando, mostramos los productos
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center mb-5 text-purple">Nuestros Perfumes</h2>
        <div className="row g-4">
          {productos.map(producto => (
            <div key={producto.id} className="col-lg-4 col-md-6">
              <div className="card h-100 shadow-sm border-0 product-card">
                <Link to={`/producto/${producto.id}`}>
                  <img src={producto.image} className="card-img-top" alt={producto.name} />
                </Link>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-purple">
                    <Link to={`/producto/${producto.id}`} className="text-decoration-none text-purple">
                      {producto.name}
                    </Link>
                  </h5>
                  <p className="card-text h4 text-muted">{formatCurrency(producto.price)}</p>
                  
                  {/* --- 11. CAMBIO en el onClick --- */}
                  <button 
                    onClick={() => addToCart(producto)} 
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