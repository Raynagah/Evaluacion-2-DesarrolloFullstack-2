import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// Importa el proveedor del contexto del carrito
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// --- LAYOUTS ---
import MainLayout from './layouts/MainLayout'; // Layout PÚBLICO
import AdminLayout from './layouts/AdminLayout'; // Layout de ADMIN

// --- PÁGINAS PÚBLICAS Y DE AUTENTICACIÓN ---
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
import Categorias from './pages/Categorias';
import Ofertas from './pages/Ofertas';
import Comprar from './pages/Comprar';
import PagoCorrecto from './pages/PagoCorrecto';
import PagoError from './pages/PagoError';

// --- PÁGINAS DE ADMINISTRADOR ---
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEditarProducto from './pages/admin/AdminEditarProducto';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>

            {/* --- GRUPO 1: RUTAS PÚBLICAS (Con MainLayout) --- */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Inicio />} />
              <Route path="registro" element={<Registro />} />
              <Route path="login" element={<Login />} />
              <Route path="tienda" element={<Tienda />} />
              <Route path="producto/:id" element={<DetalleProducto />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="carrito" element={<Carrito />} />
              <Route path="blog/armani" element={<BlogArmani />} />
              <Route path="blog/carolina" element={<BlogCarolina />} />
              <Route path="nosotros" element={<Nosotros />} />
              <Route path="contacto" element={<Contacto />} />
              <Route path="categorias" element={<Categorias />} />
              <Route path="ofertas" element={<Ofertas />} />
              <Route path="comprar" element={<Comprar />} />
              <Route path="pago-correcto" element={<PagoCorrecto />} />
              <Route path="pago-error" element={<PagoError />} />
            </Route>

            {/* --- GRUPO 2: RUTAS DE AUTENTICACIÓN (Sin Layout) --- */}


            {/* --- GRUPO 3: RUTAS DE ADMINISTRADOR (Con AdminLayout) --- */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="producto/editar/:id" element={<AdminEditarProducto />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;