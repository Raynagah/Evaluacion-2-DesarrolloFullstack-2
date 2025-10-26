import React, { createContext, useContext, useState, useEffect } from 'react';
// --- ¡CORRECCIÓN 1: IMPORTAR 'createUser' ---
// Importamos AMBAS funciones de nuestra API de usuarios
import { getAllUsers, createUser } from '../data/usersAPI'; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Estado para el usuario actual.
  // Esta parte de leer/guardar en sessionStorage es PERFECTA, no se toca.
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const user = sessionStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      return null;
    }
  });

  // Este useEffect también es PERFECTO, no se toca.
  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      sessionStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  /**
   * (C)RÍTICA DE SEGURIDAD:
   * (Tu comentario es 100% correcto)
   */
  // Tu función 'login' está PERFECTA, no se toca.
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      getAllUsers().then(users => {
        // Buscamos al usuario en nuestra API simulada
        const user = users.find(u => u.correo === email && u.password === password);

        if (user) {
          // ¡Encontrado! Lo guardamos en el estado
          // No guardamos la contraseña en el estado por seguridad
          const { password: _, ...userToStore } = user;
          setCurrentUser(userToStore);
          resolve(userToStore); // Devolvemos el usuario
        } else {
          // No encontrado
          reject(new Error('Credenciales inválidas.'));
        }
      });
    });
  };

  // --- ¡CORRECCIÓN 2: AÑADIR LA FUNCIÓN DE REGISTRO! ---
  /**
   * Esta función guarda permanentemente al usuario en la
   * "base de datos" (usersAPI) y luego inicia su sesión.
   */
  const register = (userData) => {
    return new Promise((resolve, reject) => {
      // Aseguramos que el tipo siempre sea 'cliente'
      const fullUserData = {
        ...userData,
        tipo: 'cliente'
      };
      
      // Llamamos a la API para CREAR el usuario (guardar en localStorage)
      createUser(fullUserData)
        .then(newUser => {
          // Si la API tuvo éxito (usuario creado):
          // 1. Iniciar sesión inmediatamente
          const { password: _, ...userToStore } = newUser;
          setCurrentUser(userToStore);
          // 2. Devolver el nuevo usuario al formulario de registro
          resolve(userToStore);
        })
        .catch(error => {
          // Si la API falló (ej: email duplicado)
          reject(error);
        });
    });
  };
  // --- FIN DE LA CORRECCIÓN 2 ---


  // Tu función 'logout' es PERFECTA, no se toca.
  // Solo limpia el estado, y el useEffect se encarga del sessionStorage.
  const logout = () => {
    setCurrentUser(null);
  };

  // Valores que proveerá el contexto
  const value = {
    currentUser,
    login,
    logout,
    // --- ¡CORRECCIÓN 3: EXPONER 'register'! ---
    register, // Añadimos la nueva función al contexto
    isAuthenticated: !!currentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};