import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const LoginComponent = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginSuccess = onLogin(username, password);
    if (loginSuccess) {
      setIsLoggedIn(true);
    } else {
      setLoginError(true);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/main" />;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: '300px', width: '100%' }}>
        <h2 style={{ textAlign: 'center' }}>Inicio de sesión</h2>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        {loginError && <div style={{ color: 'red', textAlign: 'center' }}>Credenciales incorrectas. Inténtalo de nuevo.</div>}
        <div style={{ textAlign: 'center' }}>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Iniciar sesión</button>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;
