// import React, { useState, useEffect } from 'react';
// // 1. Importar los componentes de react-bootstrap para el Modal y el Formulario
// import { Button, Modal, Form, Table } from 'react-bootstrap';

// // 2. Importar TODAS las funciones de la API
// import { 
//   getAllProducts, 
//   createProduct, 
//   updateProduct, 
//   deleteProduct 
// } from '../../data/productsAPI'; // Ajusta la ruta si es necesario

// // Un estado inicial vacío para el formulario
// const initialFormState = {
//   name: '',
//   price: 0,
//   normalPrice: 0,
//   genero: '',
//   tipo: '',
//   description: '',
//   image: 'https://placehold.co/400x400' // Imagen por defecto
// };

// function GestionProductos() {
//   // --- ESTADOS ---
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState(initialFormState);
//   const [editingProduct, setEditingProduct] = useState(null); // null = Creando, ID = Editando

//   // --- LÓGICA DE CARGA (READ) ---
//   const loadProducts = () => {
//     setLoading(true);
//     getAllProducts()
//       .then(data => {
//         setProducts(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error("Error al cargar productos:", error);
//         setLoading(false);
//       });
//   };

//   // Cargar productos al montar el componente
//   useEffect(() => {
//     loadProducts();
//   }, []);

//   // --- LÓGICA DE MODAL ---
//   const handleCloseModal = () => {
//     setShowModal(false);
//     setEditingProduct(null);
//     setFormData(initialFormState); // Limpiar el formulario
//   };

//   const handleShowCreateModal = () => {
//     setEditingProduct(null);
//     setFormData(initialFormState);
//     setShowModal(true);
//   };

//   const handleShowEditModal = (product) => {
//     setEditingProduct(product); // Guardar el producto que estamos editando
//     setFormData(product); // Llenar el formulario con sus datos
//     setShowModal(true);
//   };

//   // --- LÓGICA DEL FORMULARIO ---
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   // --- LÓGICA CRUD (CREATE, UPDATE, DELETE) ---

//   // CREATE y UPDATE
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (editingProduct) {
//       // --- (U)PDATE ---
//       updateProduct(editingProduct.id, formData)
//         .then(() => {
//           alert("¡Producto actualizado con éxito!");
//           handleCloseModal();
//           loadProducts(); // Recargar la tabla
//         })
//         .catch(error => console.error("Error al actualizar:", error));
//     } else {
//       // --- (C)REATE ---
//       createProduct(formData)
//         .then(() => {
//           alert("¡Producto creado con éxito!");
//           handleCloseModal();
//           loadProducts(); // Recargar la tabla
//         })
//         .catch(error => console.error("Error al crear:", error));
//     }
//   };

//   // --- (D)ELETE ---
//   const handleDelete = (id, name) => {
//     if (window.confirm(`¿Estás seguro de que quieres eliminar "${name}"?`)) {
//       deleteProduct(id)
//         .then(() => {
//           alert("Producto eliminado.");
//           loadProducts(); // Recargar la tabla
//         })
//         .catch(error => console.error("Error al eliminar:", error));
//     }
//   };
  
//   // Helper para formatear moneda
//   const formatCurrency = (value) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);

//   // --- RENDERIZADO ---
//   return (
//     <>
//       {/* Contenido principal (el <main> de tu HTML) */}
//       <main className="container my-5">
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h1 className="text-purple">Gestión de Productos</h1>
//           {/* Este botón ahora usa el estado de React */}
//           <Button variant="purple" onClick={handleShowCreateModal}>
//             Nuevo Producto
//           </Button>
//         </div>

//         {/* Tabla de productos */}
//         <div className="table-responsive">
//           <Table striped bordered hover>
//             <thead className="table-purple">
//               <tr>
//                 <th>ID</th>
//                 <th>Nombre</th>
//                 <th>Precio</th>
//                 <th>Género</th>
//                 <th>Tipo</th>
//                 <th>Acciones</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="text-center">Cargando productos...</td>
//                 </tr>
//               ) : (
//                 products.map(product => (
//                   <tr key={product.id}>
//                     <td>{product.id}</td>
//                     <td>{product.name}</td>
//                     <td>{formatCurrency(product.price)}</td>
//                     <td>{product.genero}</td>
//                     <td>{product.tipo}</td>
//                     <td>
//                       <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShowEditModal(product)}>
//                         Editar
//                       </Button>
//                       <Button variant="outline-danger" size="sm" onClick={() => handleDelete(product.id, product.name)}>
//                         Eliminar
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </Table>
//         </div>
//       </main>

//       {/* Modal para nuevo/editar producto (manejado por React) */}
//       <Modal show={showModal} onHide={handleCloseModal} size="lg">
//         <Form onSubmit={handleSubmit}>
//           <Modal.Header closeButton className="bg-purple text-white">
//             <Modal.Title>
//               {editingProduct ? "Editar Producto" : "Nuevo Producto"}
//             </Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             {/* Usamos el Form de react-bootstrap */}
//             <Form.Group className="mb-3">
//               <Form.Label>Nombre *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
            
//             <Form.Group className="mb-3">
//               <Form.Label>Descripción</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <div className="row">
//               <Form.Group as="div" className="col-md-6 mb-3">
//                 <Form.Label>Precio *</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>
//               <Form.Group as="div" className="col-md-6 mb-3">
//                 <Form.Label>Precio Normal</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="normalPrice"
//                   value={formData.normalPrice}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             </div>

//             <div className="row">
//               <Form.Group as="div" className="col-md-6 mb-3">
//                 <Form.Label>Género *</Form.Label>
//                 <Form.Select
//                   name="genero"
//                   value={formData.genero}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="" disabled>Seleccione...</option>
//                   <option value="Femenino">Femenino</option>
//                   <option value="Masculino">Masculino</option>
//                   <option value="Unisex">Unisex</option>
//                 </Form.Select>
//               </Form.Group>
//               <Form.Group as="div" className="col-md-6 mb-3">
//                 <Form.Label>Tipo *</Form.Label>
//                 <Form.Select
//                   name="tipo"
//                   value={formData.tipo}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="" disabled>Seleccione...</option>
//                   <option value="Eau de Parfum">Eau de Parfum</option>
//                   <option value="Eau de Toilette">Eau de Toilette</option>
//                   <option value="Eau de Cologne">Eau de Cologne</option>
//                 </Form.Select>
//               </Form.Group>
//             </div>

//             <Form.Group className="mb-3">
//               <Form.Label>URL de Imagen</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="image"
//                 value={formData.image}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleCloseModal}>
//               Cancelar
//             </Button>
//             <Button variant="purple" type="submit">
//               Guardar Producto
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>
//     </>
//   );
// }

// export default GestionProductos;
// **/