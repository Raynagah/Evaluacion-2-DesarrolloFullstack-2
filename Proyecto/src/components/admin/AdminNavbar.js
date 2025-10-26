import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // (Ajusta la ruta si es necesario)

function AdminNavbar() {
  const { currentUser, logout } = useAuth();

  return (
    // Usamos tus clases de Bootstrap y tu color 'bg-purple'
    <nav className="navbar navbar-expand-lg navbar-dark bg-purple shadow-sm sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/admin">
          Perfumería Admin
        </Link>
        <button 
          className="navbar-toggler" 
          type="button"
          data-bs-toggle="collapse" 
          data-bs-target="#adminNavbarCollapse" 
          aria-controls="adminNavbarCollapse" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="adminNavbarCollapse">
          {/* Enlaces a la izquierda */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {/* 'end' es para que 'Dashboard' no quede activo en otras rutas */}
              <NavLink className="nav-link" to="/admin" end>
                <i className="bi bi-speedometer2 me-1"></i>
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/productos">
                <i className="bi bi-box-seam me-1"></i>
                Productos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/pedidos">
                <i className="bi bi-table me-1"></i>
                Pedidos
              </NavLink>
            </li>
          </ul>
          
          {/* Enlaces a la derecha */}
          <div className="d-flex align-items-center">
            <span className="navbar-text me-3">
              Hola, {currentUser?.nombre || 'Admin'}
            </span>
            <Link to="/" className="btn btn-outline-light btn-sm me-2">
              Ver Tienda
            </Link>
            <button onClick={logout} className="btn btn-light btn-sm">
              <i className="bi bi-box-arrow-right me-1"></i>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;