// --- 1. NUESTRA "BASE DE DATOS" SIMULADA ---
// Lista actualizada con 15 productos.
let products = [
  { 
    id: 1, 
    name: '1 Million',
    brand: 'Paco Rabanne', 
    price: 89000, 
    normalPrice: 99000, 
    image: '/assets/img/1 Million Rabanne.webp', 
    genero: 'Masculino', 
    tipo: 'Eau de Toilette',
    description: 'Una fragancia icónica y extravagante, que representa el lujo y el poder. Notas de cuero especiado, mandarina y canela.'
  },
  { 
    id: 2, 
    name: 'Black Orchid',
    brand: 'Tom Ford', 
    price: 115000, 
    normalPrice: 130000, 
    image: '/assets/img/Black Orchid Tom Ford.jpg', 
    genero: 'Unisex', 
    tipo: 'Eau de Parfum',
    description: 'Lujosa y sensual, Black Orchid es una fragancia rica y oscura de orquídea negra e incienso, moderna y atemporal.'
  },
  { 
    id: 3, 
    name: 'Burberry Brit', 
    brand: 'Burberry',
    price: 72000, 
    normalPrice: 85000, 
    image: '/assets/img/Burberry Brit Eau de Toilette Burberry.jpg', 
    genero: 'Femenino', 
    tipo: 'Eau de Toilette',
    description: 'Una fragancia clásica y elegante con un toque británico. Notas de pera helada, almendra azucarada y vainilla.'
  },
  { 
    id: 4, 
    name: 'CH for Men', 
    brand: 'Carolina Herrera',
    price: 79000, 
    normalPrice: 89000, 
    image: '/assets/img/CHPerfumesHombre.avif', 
    genero: 'Masculino', 
    tipo: 'Eau de Toilette',
    description: 'Representa la esencia del estilo de vida elegante de CH. Una fusión de tradición y modernidad con notas de cuero y azafrán.'
  },
  // { id: 5, name: 'CH for Women', ... } <-- ELIMINADO
  { 
    id: 6, 
    name: 'Coco Mademoiselle Intense',
    brand: 'Chanel', 
    price: 125000, 
    normalPrice: 140000, 
    image: '/assets/img/Coco Mademoiselle Intense Chanel.webp', 
    genero: 'Femenino', 
    tipo: 'Eau de Parfum',
    description: 'Una versión más profunda y sensual de Coco Mademoiselle. Pachulí extremo y haba tonka para una estela irresistible.'
  },
  { 
    id: 7, 
    name: 'Creed Aventus', 
    brand: 'Creed',
    price: 155000, 
    normalPrice: 180000, 
    image: '/assets/img/Creed Aventus.webp', 
    genero: 'Masculino', 
    tipo: 'Eau de Parfum',
    description: 'Una fragancia legendaria que celebra la fuerza, el poder y el éxito. Famosa por sus notas de piña ahumada y abedul.'
  },
  { 
    id: 8, 
    name: 'Dior Homme Intense', 
    brand: 'Dior',
    price: 98000, 
    normalPrice: 110000, 
    image: '/assets/img/Dior Homme Intense Edp 100ml Hombre.webp', 
    genero: 'Masculino', 
    tipo: 'Eau de Parfum',
    description: 'Una fragancia sofisticada y elegante con un corazón de iris, almizcle y cedro. Un clásico moderno de la perfumería masculina.'
  },
  { 
    id: 9, 
    name: 'Eros', 
    brand: 'Versace',
    price: 85000, 
    normalPrice: 95000, 
    image: '/assets/img/Eros Versace.webp', 
    genero: 'Masculino', 
    tipo: 'Eau de Toilette',
    description: 'Inspirada en el dios griego del amor. Una fragancia vibrante y luminosa con menta, manzana verde y vainilla.'
  },
  { 
    id: 10, 
    name: 'Explorer', 
    brand: 'Montblanc',
    price: 76000, 
    normalPrice: 88000, 
    image: '/assets/img/Explorer Montblanc.jpg', 
    genero: 'Masculino', 
    tipo: 'Eau de Parfum',
    description: 'Una invitación a un viaje fantástico, un irresistible llamado a la aventura. Notas de vetiver, pachulí y maderas.'
  },
  // { id: 11, name: 'Armani Code', ... } <-- ELIMINADO
  { 
    id: 12, 
    name: 'Good Girl', 
    brand: 'Carolina Herrera',
    price: 85000, 
    normalPrice: 95000, 
    image: '/assets/img/Good Girl Carolina Herrera.jpg', 
    genero: 'Femenino', 
    tipo: 'Eau de Parfum',
    description: 'Una fragancia audaz y sofisticada, inspirada en la visión única de Carolina Herrera de la dualidad de la mujer moderna.'
  },
  { 
    id: 13, 
    name: 'La Nuit de L\'Homme', 
    brand: 'Yves Saint Laurent',
    price: 94000, 
    normalPrice: 105000, 
    image: '/assets/img/La Nuit de L\'Homme Yves Saint Laurent.webp', 
    genero: 'Masculino', 
    tipo: 'Eau de Toilette',
    description: 'Un perfume lleno de tensión y contrastes, para un seductor oscuro y enigmático. Notas de cardamomo, lavanda y vetiver.'
  },
  { 
    id: 14, 
    name: 'La Vie Est Belle', 
    brand: 'Lancôme',
    price: 88000, 
    normalPrice: 98000, 
    image: '/assets/img/La Vie Est Belle Lancôme.webp', 
    genero: 'Femenino', 
    tipo: 'Eau de Parfum',
    description: 'Una declaración universal a la felicidad. Una fragancia icónica con notas de iris, jazmín y flor de naranjo.'
  },
  { 
    id: 15, 
    name: 'Le Parfait Pour Homme', 
    brand: 'Armaf',
    price: 65000, 
    normalPrice: 75000, 
    image: '/assets/img/Le Parfait Pour Homme Armaf.webp', 
    genero: 'Masculino', 
    tipo: 'Eau de Parfum',
    description: 'Una fragancia intensa y especiada, diseñada para el hombre moderno que busca la perfección. Notas de piña, bergamota y cuero.'
  },
  { 
    id: 16, 
    name: 'Azzaro Wanted', 
    brand: 'Azzaro',
    price: 73000, 
    normalPrice: 83000, 
    image: '/assets/img/perfume_azzaro.png', 
    genero: 'Masculino', 
    tipo: 'Eau de Toilette',
    description: 'La fragancia de un hombre deseado. Carismático, talentoso y audaz, todo le sonríe. Notas de limón, jengibre y cardamomo.'
  },
  { 
    id: 17, 
    name: 'Valentino Uomo Intense', 
    brand: 'Valentino',
    price: 105000, 
    normalPrice: 118000, 
    image: '/assets/img/Valentino Uomo Born In Roma Intense Valentino.jpg', 
    genero: 'Masculino', 
    tipo: 'Eau de Parfum',
    description: 'Una reinterpretación intensa del clásico. Carácter carismático y vibrante con un toque de vainilla y vetiver.'
  },
];

// Para simular una API real, envolvemos  en Promesas.
// Esto permite que el código sea asíncrono, tal como lo sería
// una petición real a un servidor (fetch).

// --- 2. FUNCIONES CRUD ---

/**
 * (R)EAD: Leer todos los productos
 */
export const getAllProducts = () => {
  return new Promise((resolve) => {
    // Simulamos un pequeño retraso del servidor
    setTimeout(() => {
      resolve([...products]); // Devolvemos una copia para evitar mutaciones accidentales
    }, 500); // 500ms de retraso
  });
};

/**
 * (R)EAD: Leer un solo producto por ID
 */
export const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find(p => p.id === Number.parseInt(id));
      if (product) {
        resolve({ ...product }); // Devolver una copia
      } else {
        reject(new Error('Producto no encontrado'));
      }
    }, 300);
  });
};

/**
 * (C)REATE: Crear un nuevo producto
 */
export const createProduct = (productData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // En una DB real, el ID sería autoincremental.
      const newId = Math.max(...products.map(p => p.id)) + 1;
      const newProduct = {
        ...productData,
        id: newId,
      };
      products.push(newProduct);
      resolve(newProduct);
    }, 500);
  });
};

/**
 * (U)PDATE: Actualizar un producto existente
 */
export const updateProduct = (id, updates) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const productId = Number.parseInt(id);
      const index = products.findIndex(p => p.id === productId);
      
      if (index !== -1) {
        // Actualiza el producto
        products[index] = { ...products[index], ...updates };
        resolve({ ...products[index] }); // Devuelve el producto actualizado
      } else {
        reject(new Error('No se pudo actualizar: Producto no encontrado'));
      }
    }, 500);
  });
};

/**
 * (D)ELETE: Eliminar un producto
 */
export const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const productId = Number.parseInt(id);
      const index = products.findIndex(p => p.id === productId);
      
      if (index !== -1) {
        products.splice(index, 1); // Elimina el producto del array
        resolve(true); // Éxito
      } else {
        reject(new Error('No se pudo eliminar: Producto no encontrado'));
      }
    }, 500);
  });
};