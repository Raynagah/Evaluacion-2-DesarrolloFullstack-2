// --- 1. Importar 'useState' ---
import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import Boleta from '../components/Boleta';
import '../styles/pago.css';

function PagoCorrecto() {
  const location = useLocation();
  const nombreCliente = location.state?.nombre || 'Cliente';
  const boletaData = location.state?.boletaData;

  // --- 2. Estado para el mensaje de simulación de email ---
  const [emailMessage, setEmailMessage] = useState(null); // null, 'success', o 'error'

  // Configuración de impresión (sin cambios)
  const boletaRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => boletaRef.current,
    documentTitle: `Boleta-${boletaData?.numero || 'compra'}`,
    onAfterPrint: () => alert('Boleta guardada/impresa.')
  });

  // --- 3. Nueva función para simular el envío de email ---
  const handleSendEmail = () => {
    // Si no hay data, no hacer nada
    if (!boletaData) return;

    // Pedimos el correo al usuario, pre-llenando con el de la compra
    const emailDestino = window.prompt(
      "Ingrese el correo al que desea enviar la boleta:",
      boletaData.cliente.correo
    );

    // Si el usuario presiona "Cancelar" (emailDestino es null), no hacemos nada.
    if (emailDestino === null) {
      return;
    }

    // Validamos el correo ingresado
    if (!emailDestino) {
      // Caso 1: El usuario borró el correo y aceptó
      setEmailMessage({
        type: 'danger',
        text: 'Error: No se ha ingresado un correo válido.'
      });
    } else if (emailDestino.toLowerCase() === boletaData.cliente.correo.toLowerCase()) {
      // Caso 2: ¡Éxito! El correo coincide (ignoramos mayúsculas/minúsculas)
      setEmailMessage({
        type: 'success',
        text: `¡Simulación Exitosa! La boleta se enviará a ${emailDestino}.`
      });
    } else {
      // Caso 3: Error. El correo no coincide
      setEmailMessage({
        type: 'danger',
        text: 'Error: El correo ingresado no coincide con el registrado en la compra.'
      });
    }

    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
      setEmailMessage(null);
    }, 5000);
  };

  return (
    <div className="container my-5 py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-8">

          {/* --- Mensaje de Éxito (sin cambios) --- */}
          <div className="text-center mb-4">
            <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '5rem' }}></i>
            <h1 className="display-4 text-success mb-3">¡Pago Exitoso, {nombreCliente}!</h1>
            <p className="lead mb-4">Gracias por tu compra. Revisa el resumen de tu pedido a continuación.</p>
          </div>

          {/* --- Renderizar la Boleta (sin cambios) --- */}
          {boletaData ? (
            <Boleta ref={boletaRef} data={boletaData} />
          ) : (
            <div className="alert alert-warning text-center">
              No se pudo cargar el resumen de la boleta. (Posiblemente recargaste la página).
            </div>
          )}

          {/* --- 4. Mensaje de Alerta de Email (Nuevo) --- */}
          {/* Este div mostrará el mensaje de éxito o error del email */}
          <div className="mt-4" style={{ height: '60px' }}> {/* Damos altura fija para evitar saltos */}
            {emailMessage && (
              <div className={`alert alert-${emailMessage.type} text-center`} role="alert">
                {emailMessage.text}
              </div>
            )}
          </div>

          {/* --- 5. Botones de Acción (Modificado) --- */}
          <div className="d-grid gap-3 d-md-flex justify-content-md-center mt-3">

            {/* --- Botón de Imprimir (existente) --- */}
            <button
              onClick={handlePrint}
              className="btn btn-purple btn-lg"
              disabled={!boletaData}
            >
              <i className="bi bi-printer-fill me-2"></i>
              Imprimir / Guardar PDF
            </button>

            {/* --- Botón de Email (Nuevo) --- */}
            <button
              onClick={handleSendEmail}
              className="btn btn-success btn-lg" // Usamos verde para "enviar"
              disabled={!boletaData}
            >
              <i className="bi bi-envelope-fill me-2"></i>
              Enviar por Email
            </button>

            {/* --- Botón de Volver al Inicio (existente) --- */}
            <Link to="/" className="btn btn-outline-secondary btn-lg">
              Volver al Inicio
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PagoCorrecto;