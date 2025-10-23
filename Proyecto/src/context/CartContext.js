import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Crear el Contexto
const CartContext = createContext();

// 2. Crear un "hook" personalizado para usar el contexto fácilmente
export const useCart = () => useContext(CartContext);

// 3. Crear el Proveedor del Contexto
export const CartProvider = ({ children }) => {
  // 4. Estado para los items del carrito
  // Lee el valor inicial desde localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const itemsFromStorage = localStorage.getItem('cart');
      return itemsFromStorage ? JSON.parse(itemsFromStorage) : [];
    } catch (error) {
      console.error("Error al leer localStorage", error);
      return [];
    }
  });

  // 5. useEffect para guardar en localStorage CADA VEZ que el carrito cambie
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error al guardar en localStorage", error);
    }
  }, [cartItems]);

  // 6. Función para añadir al carrito
  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Buscar si el producto ya existe
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Si existe, actualiza la cantidad
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Si no existe, añádelo con cantidad 1
        // Asegúrate de incluir la imagen y otros datos que necesites
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    alert(`Has añadido ${product.name} al carrito.`);
  };

  // 7. Funciones para actualizar, eliminar y vaciar
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // No permitir cantidades menores a 1
    setCartItems(items =>
      items.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeFromCart = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // 8. Valor derivado: el contador total de ítems para el Navbar
  // Suma las 'quantity' de todos los items
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // 9. Valores que el proveedor "ofrecerá" a sus hijos
  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount // ¡Este es el número para el Navbar!
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};