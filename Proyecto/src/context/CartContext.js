import React, { createContext, useState, useContext } from 'react';

// 1. Creamos el Contexto
// Este es el objeto que los componentes usarán para comunicarse.
const CartContext = createContext();

// 2. Creamos un Hook personalizado para usar el Contexto más fácilmente
// En lugar de importar useContext y CartContext en cada archivo, solo importaremos useCart.
export const useCart = () => useContext(CartContext);

// 3. Creamos el Proveedor del Contexto (Provider)
// Este componente envolverá nuestra aplicación y contendrá toda la lógica y el estado del carrito.
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    // Buscamos si el producto ya existe en el carrito
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      // Si existe, solo aumentamos su cantidad
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      // Si es un producto nuevo, lo agregamos con cantidad 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Puedes agregar más funciones aquí: removeFromCart, updateQuantity, clearCart, etc.

  // Calculamos la cantidad total de items para el contador del Navbar
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  // 4. El valor (value) que proveemos contiene el estado y las funciones que queremos
  //    que estén disponibles para el resto de la aplicación.
  const value = {
    cartItems,
    addToCart,
    totalItemsInCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

