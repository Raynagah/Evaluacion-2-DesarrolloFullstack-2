// src/pages/admin/AdminPerfil.js

import React from 'react';
import { useAuth } from '../../context/AuthContext'; // To get current user details
import NavBar from '../../components/admin/AdminNavbar'; // Admin Navbar
import { Card, ListGroup, Container, Row, Col } from 'react-bootstrap';

function AdminPerfil() {
  const { currentUser } = useAuth(); // Get the logged-in user from context

  // Basic check in case currentUser is somehow null
  if (!currentUser) {
    return (
      <>
        <NavBar />
        <Container className="mt-5 text-center">
          <p className="text-danger">Error: No se pudo cargar la información del usuario.</p>
        </Container>
      </>
    );
  }

  // Helper to display data or a placeholder
  const displayData = (data) => data || <span className="text-muted">No especificado</span>;

  return (
    <>
      <NavBar />
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <h1 className="text-purple mb-4 text-center">Perfil de Administrador</h1>
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-purple text-white">
                <i className="bi bi-person-circle me-2"></i>
                Información Personal
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Nombre Completo:</strong> {displayData(`${currentUser.nombre} ${currentUser.apellidos}`)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Correo Electrónico:</strong> {displayData(currentUser.correo || currentUser.email)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>RUT:</strong> {displayData(currentUser.rut)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Tipo de Usuario:</strong> <span className="badge bg-danger">{currentUser.tipo}</span>
                </ListGroup.Item>
                {/* You can add more fields if they exist in currentUser */}
                <ListGroup.Item>
                  <strong>Dirección:</strong> {displayData(currentUser.direccion)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Región:</strong> {displayData(currentUser.region)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Comuna:</strong> {displayData(currentUser.comuna)}
                </ListGroup.Item>
              </ListGroup>
              {/* Optional: Add an edit button later */}
              {/* <Card.Body className="text-center">
                <Button variant="outline-primary">Editar Perfil</Button>
              </Card.Body> */}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AdminPerfil;