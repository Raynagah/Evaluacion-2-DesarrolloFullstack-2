import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // <--- 1. Importar Auth
import { Button } from 'react-bootstrap';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate(); // Hook para redirigir en logout
  const { cartCount } = useCart();
  const { currentUser, logout, isAuthenticated } = useAuth(); // <--- 2. Obtener datos de Auth

  const isAdminView = location.pathname.startsWith('/admin');

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirigir al login después de cerrar sesión
  };

  // --- 3. BARRA DE NAVEGACIÓN DEL ADMINISTRADOR ---
  if (isAdminView) {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-purple">
        <div className="container">
          <Link className="navbar-brand" to="/admin">
            <img src="https://cdn-icons-png.freepik.com/256/30/30422.png" alt="Inicio Admin" height="40" />
            <span>Inicio Admin</span>
          </Link>

          {/* Mostrar bienvenida y botón de logout */}
          {isAuthenticated && currentUser ? (
            <span className="navbar-text text-white me-auto ms-3">
              ¡Bienvenido, {currentUser.nombre}!
            </span>
          ) : (
            <span className="navbar-text text-white me-auto ms-3">
              No autenticado
            </span>
          )}

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><NavLink className="nav-link" to="/admin">Inicio Admin</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/admin/productos">Productos</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/admin/usuarios">Usuarios</NavLink></li>
              <li className="nav-item"><Link className="nav-link" to="/">Salir al Sitio</Link></li>
              <li className="nav-item">
                <Button variant="outline-light" size="sm" onClick={handleLogout}>Cerrar Sesión</Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  // --- 4. BARRA DE NAVEGACIÓN DEL CLIENTE ---
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-purple">
      <div className="container">
        <Link className="navbar-brand itemNavbarInicio" to="/">
          <img src="https://cdn-icons-png.flaticon.com/512/775/775307.png" alt="Logo" height="40" />
          <span>Inicio</span>
        </Link>

        {/* Lógica de bienvenida y Login/Logout */}
        {isAuthenticated && currentUser ? (
          <span className="navbar-text text-white ms-3">
            Hola, {currentUser.nombre}
          </span>
        ) : (
          <Link id="link-login" className="navbar-brand" to="/login">
            <img src="https://cdn-icons-png.freepik.com/256/30/30422.png" alt="Iniciar sesión" height="40" />
            <span>Iniciar sesión</span>
          </Link>
        )}

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/">Inicio</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/tienda">Tienda</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/categorias">Categorías</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link text-danger fw-bold" to="/ofertas">Ofertas 🔥</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/blogs">Blogs</NavLink></li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/carrito">
                Carrito
                {cartCount > 0 && (
                  <span className="badge bg-danger ms-1">{cartCount}</span>
                )}
              </NavLink>
            </li>

            {/* Mostrar "Ingresar" o "Cerrar Sesión" */}
            {isAuthenticated ? (
              <li className="nav-item">
                <Button variant="outline-light" size="sm" onClick={handleLogout} className="ms-2">Cerrar Sesión</Button>
              </li>
            ) : (
              <li className="nav-item"><NavLink className="nav-link" to="/login">Ingresar</NavLink></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;