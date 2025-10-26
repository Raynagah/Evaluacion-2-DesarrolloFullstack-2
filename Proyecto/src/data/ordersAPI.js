// Simulamos una base de datos de pedidos
const orders = [
  {
    id: 1001,
    clienteId: 2,
    clienteNombre: 'Cliente Prueba',
    fecha: '2025-10-24T14:30:00Z',
    total: 115000,
    estado: 'Completado',
    items: [{ id: 2, quantity: 1 }]
  },
  {
    id: 1002,
    clienteId: 2,
    clienteNombre: 'Cliente Prueba',
    fecha: '2025-10-23T10:15:00Z',
    total: 161000,
    estado: 'Completado',
    items: [{ id: 7, quantity: 1 }, { id: 3, quantity: 1, price: 72000 }] // Precio de Good Girl
  },
  {
    id: 1003,
    clienteId: 1, // Comprado por el admin
    clienteNombre: 'Admin Principal',
    fecha: '2025-10-22T09:05:00Z',
    total: 89000,
    estado: 'Pendiente',
    items: [{ id: 1, quantity: 1 }]
  },
  {
    id: 1004,
    clienteId: 2,
    clienteNombre: 'Cliente Prueba',
    fecha: '2025-10-21T18:45:00Z',
    total: 125000,
    estado: 'Completado',
    items: [{ id: 6, quantity: 1 }]
  },
  {
    id: 1005,
    clienteId: 2,
    clienteNombre: 'Cliente Prueba',
    fecha: '2025-10-20T11:20:00Z',
    total: 85000,
    estado: 'Cancelado',
    items: [{ id: 9, quantity: 1 }]
  }
];

// Función para obtener todos los pedidos (simulada)
export const getAllOrders = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Devolvemos ordenados por fecha, del más nuevo al más viejo
      const sortedOrders = [...orders].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      resolve(sortedOrders);
    }, 800); // Simulamos un retraso
  });
};