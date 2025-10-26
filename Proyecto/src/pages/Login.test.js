// src/pages/Login.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Login from './Login';

describe('Pruebas de Estado y Renderizado Condicional (Login)', () => {

  const renderLogin = () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/login']}>
          <Login />
        </MemoryRouter>
      </AuthProvider>
    );
  };

  // --- ESTA PRUEBA PASÓ (sin cambios) ---
  it('debe actualizar el estado (valor) del input cuando el usuario escribe', () => {
    renderLogin();
    
    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    fireEvent.change(emailInput, { target: { value: 'usuario@test.com' } });
    
    expect(emailInput.value).toBe('usuario@test.com');
  });

  // --- ESTA PRUEBA PASÓ (sin cambios) ---
  it('NO debe mostrar un mensaje de error al renderizar inicialmente', () => {
    renderLogin();
    
    const mensajeError = screen.queryByText('Credenciales inválidas.'); 
    expect(mensajeError).toBeNull();
  });


  // --- ¡AQUÍ ESTÁ LA CORRECCIÓN! ---
  it('DEBE mostrar un mensaje de error condicional si el login falla', async () => {
    renderLogin();
    
    // 1. CORRECCIÓN: Llenamos los campos con datos FALSOS
    // para pasar la validación HTML5 'required'
    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    
    fireEvent.change(emailInput, { target: { value: 'usuario@incorrecto.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    // 2. Ahora SÍ hacemos clic en el botón
    const botonIngresar = screen.getByRole('button', { name: /Ingresar/i });
    fireEvent.click(botonIngresar);

    // 3. Esperamos a que la lógica de login() falle y muestre el error
    // 'findBy...' es asíncrono y espera a que el texto aparezca.
    const mensajeError = await screen.findByText(/Credenciales inválidas/i);

    // 4. Verificamos que el mensaje de error ahora SÍ existe
    expect(mensajeError).not.toBeNull();
  });
});