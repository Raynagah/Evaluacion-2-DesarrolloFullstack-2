import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa el nuevo layout
import MainLayout from './components/MainLayout';


// Páginas de Cliente
import Inicio from './pages/Inicio';
import Tienda from './pages/Tienda';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Blogs from './pages/Blogs';
import Carrito from './pages/Carrito';
import BlogArmani from './pages/BlogArmani';
import BlogCarolina from './pages/BlogCarolina';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
// ...otras páginas de cliente

// Páginas de Administrador
import DashboardAdmin from './pages/admin/DashboardAdmin';
import GestionProductos from './pages/admin/GestionProductos';
import GestionUsuarios from './pages/admin/GestionUsuarios';


function App() {
  return (
    <Router>
      <Routes>
        {/* Todas las rutas ahora están envueltas por MainLayout */}
        <Route element={<MainLayout />}>
          {/* Rutas de Cliente */}
          <Route path="/" element={<Inicio />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="blog/armani" element={<BlogArmani />} />
          <Route path="blog/carolina" element={<BlogCarolina />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          {/* ...otras rutas de cliente */}

          {/* Rutas de Administrador */}
          <Route path="/admin" element={<DashboardAdmin />} />
          <Route path="/admin/productos" element={<GestionProductos />} />
          <Route path="/admin/usuarios" element={<GestionUsuarios />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;