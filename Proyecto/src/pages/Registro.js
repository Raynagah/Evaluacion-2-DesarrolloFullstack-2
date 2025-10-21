import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Registro() {
  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    apellidos: '',
    correo: '',
    confirmarCorreo: '',
    password: '',
    confirmarPassword: '',
    direccion: ''
  });

  // 1. Un solo estado para manejar todos los errores de validación
  const [errors, setErrors] = useState({});

  // Función para manejar los cambios en cualquier input
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (event) => {
    event.preventDefault(); // Previene que la página se recargue

    // 2. Lógica de validación
    const newErrors = {};
    if (formData.correo !== formData.confirmarCorreo) {
      newErrors.correo = 'Los correos electrónicos no coinciden.';
    }
    if (formData.password !== formData.confirmarPassword) {
      newErrors.password = 'Las contraseñas no coinciden.';
    }

    // 3. Si hay errores, los guardamos en el estado y detenemos el envío
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Detiene la ejecución de la función aquí
    }

    // Si no hay errores, limpiamos el estado de errores y continuamos
    setErrors({});
    
    console.log('Datos del formulario:', {
      rut: formData.rut,
      nombre: formData.nombre,
      apellidos: formData.apellidos,
      correo: formData.correo,
      password: formData.password,
      direccion: formData.direccion
    });

    // Es mejor no usar 'alert' en React, pero lo mantenemos si lo necesitas.
    // Una mejor opción sería mostrar un mensaje de éxito en la UI.
    alert('¡Registro enviado con éxito!');
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
                <form onSubmit={handleSubmit}>
                  {/* RUT */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="rut" className="form-label fw-bold">RUT *</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="rut" 
                        placeholder="12345678-9" 
                        required 
                        value={formData.rut} 
                        onChange={handleChange} 
                      />
                    </div>
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
                            value={formData.nombre}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="apellidos" className="form-label fw-bold">Apellidos *</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="apellidos" 
                            required 
                            value={formData.apellidos}
                            onChange={handleChange}
                        />
                    </div>
                  </div>

                  {/* Correo y Confirmar Correo */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="correo" className="form-label fw-bold">Correo *</label>
                        <input 
                            type="email" 
                            className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
                            id="correo" 
                            required 
                            value={formData.correo}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="confirmarCorreo" className="form-label fw-bold">Confirmar Correo *</label>
                        <input 
                            type="email" 
                            className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
                            id="confirmarCorreo" 
                            required 
                            value={formData.confirmarCorreo}
                            onChange={handleChange}
                        />
                        {/* 4. Mostramos el mensaje de error si existe */}
                        {errors.correo && <div className="invalid-feedback">{errors.correo}</div>}
                    </div>
                  </div>

                  {/* Contraseña y Confirmar Contraseña */}
                   <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="password" className="form-label fw-bold">Contraseña *</label>
                        <input 
                            type="password" 
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            id="password" 
                            required 
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="confirmarPassword" className="form-label fw-bold">Confirmar Contraseña *</label>
                        <input 
                            type="password" 
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            id="confirmarPassword" 
                            required 
                            value={formData.confirmarPassword}
                            onChange={handleChange}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
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
                          value={formData.direccion}
                          onChange={handleChange}
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
