import React, { createContext, useContext, useState, useEffect } from 'react';
// Importamos nuestra API de usuarios que creamos antes
import { getAllUsers } from '../data/usersAPI'; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Estado para el usuario actual.
  // Intentamos leerlo desde sessionStorage al cargar la app.
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const user = sessionStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      return null;
    }
  });

  // Guardar en sessionStorage cada vez que currentUser cambie
  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      sessionStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  /**
   * (C)RÍTICA DE SEGURIDAD:
   * En una app real, la API NUNCA debería devolver todos los usuarios.
   * La API debería tener un endpoint (ej: /login) que reciba el email/pass
   * y devuelva SOLO el token o el usuario si la contraseña es correcta.
   * * Esta simulación es INSEGURA y solo para fines de desarrollo.
   */
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

  const logout = () => {
    setCurrentUser(null);
  };

  // Valores que proveerá el contexto
  const value = {
    currentUser, // El objeto del usuario (o null)
    login,         // La función para iniciar sesión
    logout,        // La función para cerrar sesión
    isAuthenticated: !!currentUser // Un booleano fácil de chequear
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};