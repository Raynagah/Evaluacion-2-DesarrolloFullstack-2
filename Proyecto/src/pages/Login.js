import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // <--- 1. Importar useNavigate
import { useAuth } from '../context/AuthContext'; // <--- 2. Importar el hook de Auth

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para mensajes de error
  
  const { login } = useAuth(); // <--- 3. Obtener la función 'login' del contexto
  const navigate = useNavigate(); // <--- 4. Hook para redirigir

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Limpiar errores previos

    try {
      // 5. Llamar a la función 'login' del contexto
      const user = await login(email, password);

      // 6. ¡Éxito! Redirigir según el 'tipo' de usuario
      alert(`¡Bienvenido, ${user.nombre}!`);
      
      if (user.tipo === 'administrador') {
        navigate('/admin'); // Redirige al dashboard de admin
      } else {
        navigate('/'); // Redirige al inicio para clientes
      }

    } catch (err) {
      // 7. Si 'login' falla (rechaza la promesa), mostramos el error
      setError('Correo o contraseña incorrectos. Por favor, intente de nuevo.');
      console.error(err);
    }
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
                
                {/* 8. Mostrar el mensaje de error si existe */}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                
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
                  {/* ... (resto del form) ... */}
                  <div className="d-grid">
                    <button type="submit" className="btn btn-purple btn-lg">Ingresar</button>
                  </div>
                </form>
              </div>
              <div className="card-footer text-center py-3">
                <p className="mb-0">
                  ¿No tienes una cuenta?{' '}
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