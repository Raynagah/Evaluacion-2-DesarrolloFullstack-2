// --- 1. "BASE DE DATOS" SIMULADA DE USUARIOS ---
// Usamos 'let' para que sea mutable
let users = [
  {
    id: 1,
    rut: '12345678-9',
    nombre: 'Admin',
    apellidos: 'Principal',
    correo: 'admin@duoc.cl',
    password: 'admin',
    tipo: 'administrador',
    fechaNacimiento: '1990-01-01',
    region: 'Los Lagos',
    comuna: 'Puerto Montt',
    direccion: 'Calle Falsa 123'
  },
  {
    id: 2,
    rut: '11111111-1',
    nombre: 'Cliente',
    apellidos: 'Prueba',
    correo: 'cliente@gmail.com',
    password: 'cliente',
    tipo: 'cliente',
    fechaNacimiento: '1995-05-15',
    region: 'Metropolitana',
    comuna: 'Santiago',
    direccion: 'Avenida Siempre Viva 742'
  }
];

// --- 2. FUNCIONES CRUD (CREATE, READ, UPDATE, DELETE) ---
// Todas envueltas en Promesas para simular una API real asíncrona.

/**
 * (R)EAD: Leer todos los usuarios
 */
export const getAllUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...users]); // Devolvemos una copia
    }, 500); // 500ms de retraso
  });
};

/**
 * (C)REATE: Crear un nuevo usuario
 */
export const createUser = (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newId = Math.max(...users.map(u => u.id)) + 1;
      const newUser = {
        ...userData,
        id: newId,
      };
      users.push(newUser);
      resolve(newUser);
    }, 500);
  });
};

/**
 * (U)PDATE: Actualizar un usuario existente
 */
export const updateUser = (id, updates) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userId = Number.parseInt(id);
      const index = users.findIndex(u => u.id === userId);
      
      if (index !== -1) {
        users[index] = { ...users[index], ...updates };
        resolve({ ...users[index] }); // Devuelve el usuario actualizado
      } else {
        reject(new Error('No se pudo actualizar: Usuario no encontrado'));
      }
    }, 500);
  });
};

/**
 * (D)ELETE: Eliminar un usuario
 */
export const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userId = Number.parseInt(id);
      const index = users.findIndex(u => u.id === userId);
      
      if (index !== -1) {
        users.splice(index, 1); // Elimina el usuario del array
        resolve(true); // Éxito
      } else {
        reject(new Error('No se pudo eliminar: Usuario no encontrado'));
      }
    }, 500);
  });
};