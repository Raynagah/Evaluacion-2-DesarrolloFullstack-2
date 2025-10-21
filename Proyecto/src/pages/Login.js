import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  // 1. Estados para controlar los campos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 2. Función que maneja el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault(); // Previene la recarga de la página
    
    // Aquí irá tu lógica de autenticación.
    // Por ahora, solo mostraremos los datos en la consola.
    console.log('Intento de inicio de sesión con:', { email, password });
    alert('Formulario enviado. Revisa la consola para ver los datos.');
  };

  return (
    <section className="login-section py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow login-card">
              <div className="card-header bg-purple text-white text-center py-3">
                <h4 className="mb-0">Iniciar Sesión</h4>
              </div>
              <div className="card-body p-4">
                {/* 3. Se asocia la función handleSubmit al evento onSubmit del formulario */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="password" 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="remember" />
                    <label className="form-check-label" htmlFor="remember">Recordarme</label>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-purple btn-lg">Ingresar</button>
                  </div>
                </form>
              </div>
              <div className="card-footer text-center py-3">
                <p className="mb-0">
                  ¿No tienes una cuenta?{' '}
                  {/* 4. Se usa Link para la navegación interna a la página de registro */}
                  <Link to="/registro" className="text-purple">Regístrate aquí</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
