import React, { useState, useEffect } from 'react';
// 1. Importar componentes de react-bootstrap
import { Button, Modal, Form, Table } from 'react-bootstrap';

// 2. Importar la NUEVA API de usuarios
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
} from '../../data/usersAPI'; // Ajusta la ruta si es necesario

// Estado inicial para el formulario (basado en tu HTML)
const initialFormState = {
  rut: '',
  nombre: '',
  apellidos: '',
  correo: '',
  password: '',
  tipo: '',
  fechaNacimiento: '',
  region: '',
  comuna: '',
  direccion: ''
};

function GestionUsuarios() {
  // --- ESTADOS ---
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [editingUser, setEditingUser] = useState(null); // null = Creando, ID = Editando

  // --- LÓGICA DE CARGA (READ) ---
  const loadUsers = () => {
    setLoading(true);
    getAllUsers()
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al cargar usuarios:", error);
        setLoading(false);
      });
  };

  // Cargar usuarios al montar el componente
  useEffect(() => {
    loadUsers();
  }, []);

  // --- LÓGICA DE MODAL ---
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData(initialFormState); // Limpiar
  };

  const handleShowCreateModal = () => {
    setEditingUser(null);
    setFormData(initialFormState);
    setShowModal(true);
  };

  const handleShowEditModal = (user) => {
    setEditingUser(user);
    // Llenamos el form (sin la contraseña)
    setFormData({ ...user, password: '' }); 
    setShowModal(true);
  };

  // --- LÓGICA DEL FORMULARIO ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // --- LÓGICA CRUD (CREATE, UPDATE, DELETE) ---

  // CREATE y UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();

    // Filtramos la contraseña si está vacía (para no sobreescribirla al editar)
    let dataToSubmit = { ...formData };
    if (editingUser && !formData.password) {
      delete dataToSubmit.password;
    }

    if (editingUser) {
      // --- (U)PDATE ---
      updateUser(editingUser.id, dataToSubmit)
        .then(() => {
          alert("¡Usuario actualizado con éxito!");
          handleCloseModal();
          loadUsers(); // Recargar la tabla
        })
        .catch(error => console.error("Error al actualizar:", error));
    } else {
      // --- (C)REATE ---
      createUser(dataToSubmit)
        .then(() => {
          alert("¡Usuario creado con éxito!");
          handleCloseModal();
          loadUsers(); // Recargar la tabla
        })
        .catch(error => console.error("Error al crear:", error));
    }
  };

  // --- (D)ELETE ---
  const handleDelete = (id, name) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar a "${name}"?`)) {
      deleteUser(id)
        .then(() => {
          alert("Usuario eliminado.");
          loadUsers(); // Recargar la tabla
        })
        .catch(error => console.error("Error al eliminar:", error));
    }
  };

  // --- RENDERIZADO ---
  return (
    <>
      {/* Contenido principal (el <main> de tu HTML) */}
      <main className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-purple">Gestión de Usuarios</h1>
          <Button variant="purple" onClick={handleShowCreateModal}>
            Nuevo Usuario
          </Button>
        </div>

        {/* Tabla de usuarios */}
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead className="table-purple">
              <tr>
                <th>RUT</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Correo</th>
                <th>Tipo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center">Cargando usuarios...</td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user.id}>
                    <td>{user.rut}</td>
                    <td>{user.nombre}</td>
                    <td>{user.apellidos}</td>
                    <td>{user.correo}</td>
                    <td>{user.tipo}</td>
                    <td>
                      <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShowEditModal(user)}>
                        Editar
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDelete(user.id, user.nombre)}>
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </main>

      {/* Modal para nuevo/editar usuario */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton className="bg-purple text-white">
            <Modal.Title>
              {editingUser ? "Editar Usuario" : "Nuevo Usuario"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Convertimos todos los 'id' del HTML a 'name' para el estado */}
            <div className="row">
              <Form.Group as="div" className="col-md-6 mb-3">
                <Form.Label>RUT *</Form.Label>
                <Form.Control type="text" name="rut" value={formData.rut} onChange={handleChange} required />
              </Form.Group>
              <Form.Group as="div" className="col-md-6 mb-3">
                <Form.Label>Tipo de Usuario *</Form.Label>
                <Form.Select name="tipo" value={formData.tipo} onChange={handleChange} required>
                  <option value="" disabled>Seleccione un tipo</option>
                  <option value="administrador">Administrador</option>
                  <option value="cliente">Cliente</option>
                </Form.Select>
              </Form.Group>
            </div>

            <div className="row">
              <Form.Group as="div" className="col-md-6 mb-3">
                <Form.Label>Nombre *</Form.Label>
                <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
              </Form.Group>
              <Form.Group as="div" className="col-md-6 mb-3">
                <Form.Label>Apellidos *</Form.Label>
                <Form.Control type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} required />
              </Form.Group>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Correo *</Form.Label>
              <Form.Control type="email" name="correo" value={formData.correo} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña *</Form.Label>
              <Form.Control 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder={editingUser ? "Dejar en blanco para no cambiar" : ""}
                required={!editingUser} // Solo requerida al crear
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />
            </Form.Group>

            {/* Nota: La lógica de Regiones/Comunas es compleja.
                Esto es un placeholder. Para la carga dinámica,
                se necesitaría un useEffect y un fetch a una API de regiones.
            */}
            <div className="row">
              <Form.Group as="div" className="col-md-6 mb-3">
                <Form.Label>Región *</Form.Label>
                <Form.Select name="region" value={formData.region} onChange={handleChange} required>
                  <option value="" disabled>Seleccione una región</option>
                  <option value="Los Lagos">Los Lagos</option>
                  <option value="Metropolitana">Metropolitana</option>
                  {/* ... (Otras regiones) ... */}
                </Form.Select>
              </Form.Group>
              <Form.Group as="div" className="col-md-6 mb-3">
                <Form.Label>Comuna *</Form.Label>
                <Form.Select name="comuna" value={formData.comuna} onChange={handleChange} required>
                  <option value="" disabled>Seleccione una comuna</option>
                  <option value="Puerto Montt">Puerto Montt</option>
                  <option value="Santiago">Santiago</option>
                  {/* ... (Otras comunas) ... */}
                </Form.Select>
              </Form.Group>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Dirección *</Form.Label>
              <Form.Control as="textarea" rows={2} name="direccion" value={formData.direccion} onChange={handleChange} required />
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="purple" type="submit">
              Guardar Usuario
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default GestionUsuarios;