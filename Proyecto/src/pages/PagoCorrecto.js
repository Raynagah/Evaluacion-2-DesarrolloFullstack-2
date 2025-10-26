import React, { useState } from 'react'; // <--- Quitamos useRef, useCallback, useMemo, useEffect
import { Link, useLocation } from 'react-router-dom';
// import { useReactToPrint } from 'react-to-print'; // <--- Quitamos esto
// import Boleta from '../components/Boleta'; // <--- Quitamos esto
import '../styles/pago.css';

function PagoCorrecto() {
  const location = useLocation();
  const nombreCliente = location.state?.nombre || 'Cliente';
  // Mantenemos boletaData solo para mostrar el número
  const boletaData = location.state?.boletaData; 

  const [emailMessage, setEmailMessage] = useState(null); 

  // --- Quitamos toda la lógica de useReactToPrint ---
  // const boletaRef = useRef();
  // const handlePrint = ...
  // const handlePrintClick = ...
  // etc.

  // Función de email simulada (se queda igual)
  const handleSendEmail = () => {
    if (!boletaData) return;
    const emailDestino = window.prompt(
      "Ingrese el correo al que desea enviar la boleta:",
      boletaData.cliente.correo
    );
    if (emailDestino) {
      console.log(`Simulando envío de boleta a: ${emailDestino}`);
      setEmailMessage({ type: 'success', text: `Boleta enviada (simulado) a ${emailDestino}.` });
    } else {
      setEmailMessage({ type: 'warning', text: 'Envío de correo cancelado.' });
    }
  };

  // El console.log que teníamos para depurar también se va
  // console.log("Datos de la boleta recibidos:", boletaData);

  return (
    <div className="container my-5 text-center pago-container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg p-4">
            
            {/* --- Quitamos la Boleta oculta --- */}
            {/* <div className="d-none" ref={boletaRef}>
              <Boleta data={boletaData} />
            </div> 
            */}

            <div className="card-body">
              <i className="bi bi-patch-check-fill text-success display-1"></i>
              <h1 className="display-4 text-success mt-3">¡Pago Exitoso!</h1>
              <p className="lead fs-4">
                ¡Gracias por tu compra, <strong>{nombreCliente}</strong>!
              </p>
              {/* Mostramos el número de boleta si existe */}
              <p className="text-muted">
                Hemos recibido tu pedido.
                {boletaData?.numero && (
                  <span className="d-block fw-bold mt-2">Boleta N°: {boletaData.numero}</span>
                )}
              </p>

              <div className="mt-4" style={{ height: '60px' }}>
                {emailMessage && (
                  <div className={`alert alert-${emailMessage.type} text-center`} role="alert">
                    {emailMessage.text}
                  </div>
                )}
              </div>

              <div className="d-grid gap-3 d-md-flex justify-content-md-center mt-3">
                {/* Botón de Imprimir ahora no hace nada (o podemos ocultarlo) */}
                <button
                  // onClick={handlePrint} // <--- Quitamos el onClick
                  className="btn btn-purple btn-lg"
                  disabled // <--- Lo dejamos deshabilitado por ahora
                >
                  <i className="bi bi-printer-fill me-2"></i>
                  Imprimir Boleta (Deshabilitado)
                </button>

                <button
                  onClick={handleSendEmail}
                  className="btn btn-success btn-lg"
                  disabled={!boletaData}
                >
                  <i className="bi bi-envelope-fill me-2"></i>
                  Enviar por Email
                </button>

                <Link to="/" className="btn btn-outline-secondary btn-lg">
                  Volver al Inicio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PagoCorrecto;