import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// 1. Importamos las APIs de datos
import { getAllProducts } from '../../data/productsAPI'; // (Asegúrate que la ruta sea correcta)
import { getAllOrders } from '../../data/ordersAPI';   // (Asegúrate de crear este archivo, te lo di en el paso anterior)
import { getAllUsers } from '../../data/usersAPI';     // (Asegúrate que la ruta sea correcta)
// 2. Importamos los nuevos estilos
import '../../styles/AdminDashboard.css';

// Función para formatear moneda
const formatCurrency = (value) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);

// Límite para considerar "Bajo Stock"
const LOW_STOCK_THRESHOLD = 10;

function AdminDashboard() {
  const [stats, setStats] = useState({
    ventasTotales: 0,
    totalPedidos: 0,
    totalClientes: 0,
    stockTotal: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Usamos Promise.all para cargar todos los datos en paralelo
    const fetchData = async () => {
      try {
        setLoading(true);
        // 3. Obtenemos datos de las 3 APIs
        const [productsData, ordersData, usersData] = await Promise.all([
          getAllProducts(),
          getAllOrders(),
          getAllUsers()
        ]);

        // 4. Procesamos las Estadísticas (KPIs)
        // (Asegúrate de que tu productsAPI.js tenga el campo 'stock' que te mencioné)
        const ventasTotales = ordersData
          .filter(o => o.estado === 'Completado')
          .reduce((sum, order) => sum + order.total, 0);

        const totalPedidos = ordersData.length;
        const totalClientes = usersData.filter(u => u.tipo === 'cliente').length;
        const stockTotal = productsData.reduce((sum, product) => sum + product.stock, 0);

        setStats({ ventasTotales, totalPedidos, totalClientes, stockTotal });

        // 5. Procesamos los Últimos Pedidos (los 5 más nuevos)
        setRecentOrders(ordersData.slice(0, 5));

        // 6. Procesamos los Productos con Bajo Stock
        const bajoStock = productsData
          .filter(p => p.stock < LOW_STOCK_THRESHOLD)
          .sort((a, b) => a.stock - b.stock);

        setLowStockProducts(bajoStock);

      } catch (error) {
        console.error("Error al cargar datos del dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // El array vacío [] asegura que se ejecute 1 sola vez

  // Función para formatear la fecha
  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString('es-CL');
  };

  // Badge de estado (para la tabla de pedidos)
  const getStatusBadge = (estado) => {
    switch (estado) {
      case 'Completado':
        return <span className="badge bg-success">{estado}</span>;
      case 'Pendiente':
        return <span className="badge bg-warning text-dark">{estado}</span>;
      case 'Cancelado':
        return <span className="badge bg-danger">{estado}</span>;
      default:
        return <span className="badge bg-secondary">{estado}</span>;
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <div className="spinner-border text-purple" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  // --- Renderizado del Dashboard ---
  return (
    <div className="container-fluid p-4">
      <h1 className="h2 mb-4">Dashboard de Administración</h1>

      {/* --- Fila de Tarjetas de Estadísticas (KPIs) --- */}
      <div className="row g-4 mb-4">
        {/* Ventas Totales */}
        <div className="col-md-6 col-xl-3">
          <div className="card shadow-sm border-0 stat-card h-100">
            <div className="card-body">
              <h5 className="card-title text-uppercase text-muted mb-2">Ventas Totales</h5>
              <span className="h3 fw-bold">{formatCurrency(stats.ventasTotales)}</span>
            </div>
          </div>
        </div>
        {/* Total Pedidos */}
        <div className="col-md-6 col-xl-3">
          <div className="card shadow-sm border-0 stat-card h-100">
            <div className="card-body">
              <h5 className="card-title text-uppercase text-muted mb-2">Total Pedidos</h5>
              <span className="h3 fw-bold">{stats.totalPedidos}</span>
            </div>
          </div>
        </div>
        {/* Total Clientes */}
        <div className="col-md-6 col-xl-3">
          <div className="card shadow-sm border-0 stat-card h-100">
            <div className="card-body">
              <h5 className="card-title text-uppercase text-muted mb-2">Total Clientes</h5>
              <span className="h3 fw-bold">{stats.totalClientes}</span>
            </div>
          </div>
        </div>
        {/* Productos (Stock Total) */}
        <div className="col-md-6 col-xl-3">
          <div className="card shadow-sm border-0 stat-card h-100">
            <div className="card-body">
              <h5 className="card-title text-uppercase text-muted mb-2">Productos (Stock Total)</h5>
              <span className="h3 fw-bold">{stats.stockTotal}</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Fila de Tablas (Últimos Pedidos y Bajo Stock) --- */}
      <div className="row g-4">
        {/* Últimos Pedidos */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-purple text-white">
              <h5 className="mb-0">Últimos Pedidos</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>ID Pedido</th>
                      <th>Cliente</th>
                      <th>Fecha</th>
                      <th>Total</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map(order => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.clienteNombre}</td>
                        <td>{formatDate(order.fecha)}</td>
                        <td>{formatCurrency(order.total)}</td>
                        <td>{getStatusBadge(order.estado)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Productos con Bajo Stock */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-purple text-white">
              <h5 className="mb-0">Productos con Stock Crítico</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th className="text-end">Stock Actual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowStockProducts.map(product => (
                      <tr key={product.id}>
                        <td>
                          {/* Este enlace asume una futura página para editar productos */}
                          <Link to={`/admin/producto/editar/${product.id}`} title={`Editar ${product.name}`}>
                            {product.name}
                          </Link>
                        </td>
                        <td className="text-end">
                          <span className="fw-bold text-danger">{product.stock}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;