import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    // Usamos el hook useLocation para saber en qué ruta estamos
    const location = useLocation();
    
    // Verificamos si la ruta actual comienza con "/admin"
    const isAdminView = location.pathname.startsWith('/admin');

    // Renderizamos la barra de navegación del administrador si estamos en una ruta de admin
    if (isAdminView) {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-purple">
                <div className="container">
                    <Link className="navbar-brand" to="/admin">
                        <img src="https://cdn-icons-png.freepik.com/256/30/30422.png" alt="Inicio Admin" height="40" />
                        <span>Inicio Admin</span>
                    </Link>
                    <span className="navbar-text text-white">¡Bienvenido, Administrador!</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><Link className="nav-link" to="/admin">Inicio Admin</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/admin/productos">Productos</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/admin/usuarios">Usuarios</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/">Salir al Sitio</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
    
    // Si no, renderizamos la barra de navegación normal para clientes
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-purple">
            <div className="container">
                <Link className="navbar-brand itemNavbarInicio" to="/">
                    <img src="https://cdn-icons-png.flaticon.com/512/775/775307.png" alt="Logo" height="40" />
                    <span>Inicio</span>
                </Link>
                {/* Aquí puedes agregar lógica para mostrar/ocultar login/logout */}
                <Link id="link-login" className="navbar-brand" to="/login">
                    <img src="https://cdn-icons-png.freepik.com/256/30/30422.png" alt="Iniciar sesión" height="40" />
                    <span>Iniciar sesión</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/tienda">Tienda</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/blogs">Blogs</Link></li>
                        {/* --- ENLACE AL CARRITO AHORA ES VISIBLE --- */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/carrito">
                                Carrito
                                {/* Este contador necesitará un estado global para ser dinámico */}
                                <span className="badge bg-light text-dark ms-1">0</span> 
                            </Link>
                        </li>
                        <li className="nav-item"><Link className="nav-link" to="/login">Ingresar</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
