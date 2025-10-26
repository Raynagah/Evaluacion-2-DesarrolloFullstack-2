// src/components/admin/AdminNavbar.js
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// Import Dropdown if you want to use it
import { Dropdown } from 'react-bootstrap';

function AdminNavbar() {
  const { currentUser, logout } = useAuth();

  return (
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
        // ... (aria attributes)
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="adminNavbarCollapse">
          {/* Enlaces a la izquierda (Dashboard, Productos, etc.) */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin" end>
                <i className="bi bi-speedometer2 me-1"></i> Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/productos">
                <i className="bi bi-box-seam me-1"></i> Productos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/boletas">
                <i className="bi bi-receipt me-1"></i> Boletas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/clientes">
                <i className="bi bi-people-fill me-1"></i> Clientes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/usuarios">
                <i className="bi bi-person-gear me-1"></i> Usuarios
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/reportes">
                <i className="bi bi-file-earmark-bar-graph-fill me-1"></i> {/* Suggested icon */}
                Reportes
              </NavLink>
            </li>
          </ul>

          {/* Enlaces a la derecha */}
          <div className="d-flex align-items-center">
            {/* --- MODIFICACIÓN AQUÍ: Usar Dropdown --- */}
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" id="dropdown-admin-user" className="text-white text-decoration-none d-flex align-items-center">
                <i className="bi bi-person-circle me-2"></i>
                Hola, {currentUser?.nombre || 'Admin'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {/* --- NUEVO ENLACE A PERFIL --- */}
                <Dropdown.Item as={Link} to="/admin/perfil">
                  <i className="bi bi-person-lines-fill me-2"></i> Mi Perfil
                </Dropdown.Item>
                {/* --- FIN NUEVO ENLACE --- */}
                <Dropdown.Item as={Link} to="/">
                  <i className="bi bi-shop me-2"></i> Ver Tienda
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logout} className="text-danger">
                  <i className="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {/* --- FIN MODIFICACIÓN --- */}

            {/* Links Antiguos (se pueden quitar si usas el Dropdown)
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
            */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;