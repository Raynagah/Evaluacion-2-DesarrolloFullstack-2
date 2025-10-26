// src/pages/Comprar.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { regionesComunas } from '../data/regionesComunas';
import '../styles/comprar.css';
import { createBoleta } from '../data/boletasAPI';
// --- ¡IMPORTANTE! Importar funciones de productsAPI ---
import { updateProduct, getProductById } from '../data/productsAPI'; // <--- AÑADIR ESTO

function Comprar() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    nombre: '', apellidos: '', correo: '', calle: '',
    departamento: '', region: '', comuna: '', indicaciones: ''
  });
  const [errors, setErrors] = useState({});
  const [summary, setSummary] = useState({ subtotal: 0, envio: 0, total: 0 });
  const [comunasDisponibles, setComunasDisponibles] = useState([]);
  // --- Añadir estado de carga para el botón ---
  const [loading, setLoading] = useState(false);

  // (useEffect para calcular resumen - sin cambios)
  useEffect(() => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const envio = subtotal > 50000 ? 0 : 4500;
    const total = subtotal + envio;
    setSummary({ subtotal, envio, total });
  }, [cartItems]);

  // (useEffect para autocompletar - sin cambios)
  useEffect(() => {
    if (currentUser) {
        setFormData(prev => ({
            ...prev,
            nombre: currentUser.nombre || '',
            apellidos: currentUser.apellidos || '',
            correo: currentUser.email || currentUser.correo || '', // Usa email o correo
            calle: currentUser.calle || '',
            region: currentUser.region || '',
            comuna: currentUser.comuna || '',
            departamento: currentUser.departamento || ''
        }));
        if (currentUser.region) {
            const regionEncontrada = regionesComunas.find(r => r.nombre === currentUser.region);
            if (regionEncontrada) {
                setComunasDisponibles(regionEncontrada.comunas);
            }
        }
    }
  }, [currentUser]);

  // (handleChange - sin cambios)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'region') {
        const regionEncontrada = regionesComunas.find(r => r.nombre === value);
        if (regionEncontrada) {
            setComunasDisponibles(regionEncontrada.comunas);
            setFormData(prev => ({ ...prev, comuna: '' }));
        } else {
            setComunasDisponibles([]);
            setFormData(prev => ({ ...prev, comuna: '' }));
        }
    }
    if (errors[name]) { setErrors(prev => ({ ...prev, [name]: null })); }
  };

  // (validateForm - sin cambios)
  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = 'El nombre es obligatorio.';
    if (!formData.apellidos) newErrors.apellidos = 'Los apellidos son obligatorios.';
    if (!formData.correo) newErrors.correo = 'El correo es obligatorio.';
    if (!formData.calle) newErrors.calle = 'La calle es obligatoria.';
    if (!formData.region) newErrors.region = 'La región es obligatoria.';
    if (!formData.comuna) newErrors.comuna = 'La comuna es obligatoria.';
    if (formData.correo && !/\S+@\S+\.\S+/.test(formData.correo)) {
        newErrors.correo = 'Correo inválido.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- MODIFICAR handleProcederAlPago ---
  const handleProcederAlPago = async (e) => { // <-- Añadir async aquí
    e.preventDefault();
    if (loading) return; // Evitar doble clic
    setErrors({});
    setLoading(true); // <-- Marcar como cargando

    if (validateForm()) {
      const isPaymentSuccessful = Math.random() < 0.95; // Simulación

      if (isPaymentSuccessful) {
        const fechaCompra = new Date();
        const boletaNumero = `BOL-${Date.now()}`;
        const dataParaBoleta = {
          numero: boletaNumero,
          fecha: fechaCompra.toISOString(),
          cliente: formData,
          // Guardamos solo la info necesaria en la boleta
          items: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })),
          resumen: summary
        };

        try {
          // 1. Guardar la boleta
          await createBoleta(dataParaBoleta);
          console.log("Boleta guardada.");

          // --- 2. ACTUALIZAR STOCK DE PRODUCTOS ---
          console.log("Actualizando stock...");
          // Creamos un array de promesas, una por cada item a actualizar
          const stockUpdatePromises = cartItems.map(async (item) => {
            try {
              // Obtenemos el producto actual para saber su stock
              const productoActual = await getProductById(item.id);
              const stockActual = parseInt(productoActual.stock, 10) || 0; // Aseguramos que sea número
              const nuevoStock = stockActual - item.quantity;
              // Actualizamos el producto con el nuevo stock
              // Usamos { stock: ... } para actualizar solo ese campo
              await updateProduct(item.id, { stock: nuevoStock < 0 ? 0 : nuevoStock }); // Evita stock negativo
              console.log(`Stock actualizado para producto ID ${item.id}: ${nuevoStock}`);
            } catch (stockError) {
              // Manejar error si un producto no se encuentra o no se puede actualizar
              console.error(`Error al actualizar stock para producto ID ${item.id}:`, stockError);
              // Podrías decidir lanzar el error si es crítico para detener todo
              // throw stockError;
            }
          });

          // Esperamos a que TODAS las actualizaciones de stock terminen
          await Promise.all(stockUpdatePromises);
          console.log("Actualización de stock completada.");
          // --- FIN ACTUALIZACIÓN STOCK ---

          // 3. Limpiar el carrito
          clearCart();
          console.log("Carrito limpiado.");

          // 4. Navegar como ÚLTIMO paso
          console.log("Navegando a pago-correcto...");
          navigate('/pago-correcto', {
            state: {
              boletaData: dataParaBoleta,
              nombre: formData.nombre
            }
          });
          // No necesitamos setLoading(false) aquí porque el componente se desmonta

        } catch (error) {
          // Captura errores de createBoleta o de las actualizaciones de stock si se lanzan
          console.error("Error en el proceso de pago/guardado:", error);
          setLoading(false); // Permitir reintento si falla algo
          navigate('/pago-error', { state: { message: error.message || "Error al procesar la compra." } });
        }

      } else {
        // Si la simulación de pago falla
        console.log("Simulación de pago fallida.");
        setLoading(false); // Permitir reintento
        navigate('/pago-error');
      }
    } else {
      // Si la validación del formulario falla
      console.log('Errores de validación', errors);
      setLoading(false); // Permitir corregir y reintentar
      alert("Por favor, corrige los errores marcados en el formulario.");
    }
  };


  // --- Renderizado ---
  const formatCurrency = (value) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);

  if (cartItems.length === 0) {
    return (
      <div className="container text-center my-5 py-5">
        <h2 className="text-purple">Tu carrito está vacío.</h2>
        <Link to="/tienda" className="btn btn-purple mt-3">Ir a la Tienda</Link>
      </div>
    );
  }

  return (
    <section className="py-5 comprar-section">
      <div className="container">
        <h2 className="text-center mb-5 text-purple">Finalizar Compra</h2>
        <div className="row g-5">

          {/* === COLUMNA 1: FORMULARIO === */}
          <div className="col-lg-7">
            {/* Usamos el estado 'loading' en el botón */}
            <form onSubmit={handleProcederAlPago}>
              {/* --- Tarjeta de Información del Cliente --- */}
              <h4 className="mb-3 text-purple">Información del Cliente</h4>
              <div className="card shadow-sm border-0 mb-4">
                <div className="card-body p-4">
                  <div className="row g-3">
                    {/* ... campos nombre, apellidos, correo ... */}
                    <div className="col-sm-6">
                      <label htmlFor="nombre" className="form-label">Nombre<span className="text-danger"> *</span></label>
                      <input type="text" className={`form-control ${errors.nombre ? 'is-invalid' : ''}`} id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
                      {errors.nombre && <div className="invalid-feedback d-block">{errors.nombre}</div>}
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="apellidos" className="form-label">Apellidos<span className="text-danger"> *</span></label>
                      <input type="text" className={`form-control ${errors.apellidos ? 'is-invalid' : ''}`} id="apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange} />
                      {errors.apellidos && <div className="invalid-feedback d-block">{errors.apellidos}</div>}
                    </div>
                    <div className="col-12">
                      <label htmlFor="correo" className="form-label">Correo Electrónico<span className="text-danger"> *</span></label>
                      <input type="email" className={`form-control ${errors.correo ? 'is-invalid' : ''}`} id="correo" name="correo" placeholder="tu@correo.com" value={formData.correo} onChange={handleChange} />
                      {errors.correo && <div className="invalid-feedback d-block">{errors.correo}</div>}
                    </div>
                  </div>
                </div>
              </div>

              {/* --- Tarjeta de Información de Envío --- */}
              <h4 className="mb-3 text-purple">Información de Envío</h4>
              <div className="card shadow-sm border-0 mb-4">
                <div className="card-body p-4">
                  <div className="row g-3">
                    {/* ... campos calle, depto, region, comuna, indicaciones ... */}
                    <div className="col-12">
                      <label htmlFor="calle" className="form-label">Calle y Número<span className="text-danger"> *</span></label>
                      <input type="text" className={`form-control ${errors.calle ? 'is-invalid' : ''}`} id="calle" name="calle" placeholder="Ej: Av. Principal 123" value={formData.calle} onChange={handleChange} />
                      {errors.calle && <div className="invalid-feedback d-block">{errors.calle}</div>}
                    </div>
                    <div className="col-12">
                      <label htmlFor="departamento" className="form-label">Departamento, Oficina, etc. <span className="text-muted">(Opcional)</span></label>
                      <input type="text" className="form-control" id="departamento" name="departamento" placeholder="Ej: Depto 101" value={formData.departamento} onChange={handleChange} />
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="region" className="form-label">Región<span className="text-danger"> *</span></label>
                      <select
                        className={`form-select ${errors.region ? 'is-invalid' : ''}`}
                        id="region" name="region" value={formData.region} onChange={handleChange}
                      >
                        <option value="">Seleccione una región...</option>
                        {regionesComunas.map(region => (<option key={region.nombre} value={region.nombre}>{region.nombre}</option>))}
                      </select>
                      {errors.region && <div className="invalid-feedback d-block">{errors.region}</div>}
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="comuna" className="form-label">Comuna<span className="text-danger"> *</span></label>
                      <select
                        className={`form-select ${errors.comuna ? 'is-invalid' : ''}`}
                        id="comuna" name="comuna" value={formData.comuna} onChange={handleChange}
                        disabled={comunasDisponibles.length === 0}
                      >
                        <option value="">{formData.region ? "Seleccione una comuna..." : "Primero elija una región..."}</option>
                        {comunasDisponibles.map(comuna => (<option key={comuna} value={comuna}>{comuna}</option>))}
                      </select>
                      {errors.comuna && <div className="invalid-feedback d-block">{errors.comuna}</div>}
                    </div>
                    <div className="col-12">
                      <label htmlFor="indicaciones" className="form-label">Indicaciones para la entrega <span className="text-muted">(Opcional)</span></label>
                      <textarea className="form-control" id="indicaciones" name="indicaciones" rows="3" placeholder="Ej: Entregar en conserjería, timbre no funciona..." value={formData.indicaciones} onChange={handleChange}></textarea>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- Botones de Acción --- */}
              <div className="d-grid gap-2 mt-4"> {/* Añadido margen */}
                <button
                  type="submit"
                  className="btn btn-purple btn-lg"
                  disabled={loading} // <-- Deshabilitar mientras carga
                >
                  {/* Cambiar texto mientras carga */}
                  {loading ? 'Procesando Pago...' : 'Proceder al Pago'}
                </button>
                <Link to="/carrito" className="btn btn-outline-secondary btn-sm">Volver al Carrito</Link>
              </div>
            </form>
          </div>

          {/* === COLUMNA 2: RESUMEN DE COMPRA (sin cambios) === */}
          <div className="col-lg-5">
             {/* ... Tu código de resumen ... */}
            <h4 className="mb-3 text-purple">Resumen de tu Compra</h4>
            <div className="card shadow-sm border-0 sticky-top" style={{ top: '2rem' }}>
              <div className="card-header bg-purple text-white">Detalle de los Productos</div>
              <ul className="list-group list-group-flush">
                {cartItems.map(item => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0 text-purple">{item.name}</h6>
                      <small className="text-muted">{formatCurrency(item.price)} x {item.quantity}</small>
                    </div>
                    <span className="fw-bold">{formatCurrency(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className="card-body p-4">
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    <span>Subtotal</span>
                    <span className="fw-bold">{formatCurrency(summary.subtotal)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    <span>Envío</span>
                    <span className="fw-bold">{summary.envio === 0 ? "Gratis" : formatCurrency(summary.envio)}</span>
                  </li>
                </ul>
              </div>
              <div className="card-footer d-flex justify-content-between align-items-center">
                <h5 className="mb-0 text-purple">Total a Pagar:</h5>
                <h5 className="mb-0 text-purple fw-bold">{formatCurrency(summary.total)}</h5>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Comprar;