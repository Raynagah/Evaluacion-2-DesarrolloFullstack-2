import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Para el botón de "Cancelar"

function Registro() {
  // Creamos un estado para cada campo del formulario
  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [confirmarCorreo, setConfirmarCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [direccion, setDireccion] = useState('');
  // ... puedes añadir más estados para fecha, región, comuna, etc.

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (event) => {
    event.preventDefault(); // Previene que la página se recargue
    
    // Aquí iría tu lógica de validación y registro
    console.log('Datos del formulario:', {
      rut,
      nombre,
      apellidos,
      correo,
      password,
      direccion
    });
    alert('¡Registro enviado! Revisa la consola para ver los datos.');
  };

  return (
    <section className="registro-section py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="card shadow">
              <div className="card-header bg-purple text-white text-center py-3">
                <h4 className="mb-0">Registro</h4>
              </div>
              <div className="card-body p-4">
                {/* Usamos el evento onSubmit en el formulario */}
                <form onSubmit={handleSubmit}>
                  {/* RUT y Tipo de Usuario */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="rut" className="form-label fw-bold">RUT *</label>
                      {/* El valor del input está ligado al estado y se actualiza con onChange */}
                      <input 
                        type="text" 
                        className="form-control" 
                        id="rut" 
                        placeholder="12345678-9" 
                        required 
                        value={rut} 
                        onChange={(e) => setRut(e.target.value)} 
                      />
                    </div>
                    {/* ... otros campos siguen el mismo patrón ... */}
                  </div>
                  
                  {/* Nombre y Apellidos */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="nombre" className="form-label fw-bold">Nombre *</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="nombre" 
                            required 
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="apellidos" className="form-label fw-bold">Apellidos *</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="apellidos" 
                            required 
                            value={apellidos}
                            onChange={(e) => setApellidos(e.target.value)}
                        />
                    </div>
                  </div>

                  {/* Correo y Confirmar Correo */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="correo" className="form-label fw-bold">Correo *</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="correo" 
                            required 
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="confirmarCorreo" className="form-label fw-bold">Confirmar Correo *</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="confirmarCorreo" 
                            required 
                            value={confirmarCorreo}
                            onChange={(e) => setConfirmarCorreo(e.target.value)}
                        />
                    </div>
                  </div>

                  {/* Contraseña y Confirmar Contraseña */}
                   <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="password" className="form-label fw-bold">Contraseña *</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="confirmarPassword" className="form-label fw-bold">Confirmar Contraseña *</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="confirmarPassword" 
                            required 
                            value={confirmarPassword}
                            onChange={(e) => setConfirmarPassword(e.target.value)}
                        />
                    </div>
                  </div>

                  {/* Dirección */}
                  <div className="mb-4">
                      <label htmlFor="direccion" className="form-label fw-bold">Dirección *</label>
                      <textarea 
                          className="form-control" 
                          id="direccion" 
                          rows="2" 
                          required
                          value={direccion}
                          onChange={(e) => setDireccion(e.target.value)}
                      ></textarea>
                  </div>

                  <div className="d-flex justify-content-between">
                    <Link to="/login" className="btn btn-outline-secondary btn-lg">Cancelar</Link>
                    <button type="submit" className="btn btn-purple btn-lg">Registrarse</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Registro;