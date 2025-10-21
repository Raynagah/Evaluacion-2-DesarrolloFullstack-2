import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa el layout principal
import MainLayout from './layouts/MainLayout'; // Ajusta la ruta si es necesario

// Importa el proveedor del contexto del carrito
import { CartProvider } from './context/CartContext';

// Importa todas las páginas de cliente
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
import DetalleProducto from './pages/DetalleProducto';

// Importa las páginas de administrador
import DashboardAdmin from './pages/admin/DashboardAdmin';
import GestionProductos from './pages/admin/GestionProductos';
import GestionUsuarios from './pages/admin/GestionUsuarios';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* Todas las rutas se renderizan dentro de MainLayout para tener Navbar y Footer */}
          <Route path="/" element={<MainLayout />}>
            {/* Rutas de Cliente */}
            <Route index element={<Inicio />} />
            <Route path="tienda" element={<Tienda />} />
            <Route path="producto/:id" element={<DetalleProducto />} />
            <Route path="registro" element={<Registro />} />
            <Route path="login" element={<Login />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="carrito" element={<Carrito />} />
            <Route path="blog/armani" element={<BlogArmani />} />
            <Route path="blog/carolina" element={<BlogCarolina />} />
            <Route path="nosotros" element={<Nosotros />} />
            <Route path="contacto" element={<Contacto />} />

            {/* Rutas de Administrador */}
            <Route path="admin" element={<DashboardAdmin />} />
            <Route path="admin/productos" element={<GestionProductos />} />
            <Route path="admin/usuarios" element={<GestionUsuarios />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

