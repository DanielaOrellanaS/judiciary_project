import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import HeaderComponent from './components/HeaderComponent';
import LateralMenuComponent from './components/LateralMenuComponent';
import AssignedCausesComponent from './components/AssignedCausesComponent';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    if (username === 'usuario' && password === '12345678') {
      setIsLoggedIn(true);
      return true;
    } else {
      return false;
    }
  };

  return (
    <Router>
      <div className="App" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* Renderizar el componente HeaderComponent solo si el usuario ha iniciado sesión */}
        {isLoggedIn && <HeaderComponent />}
        <Routes>
          <Route path="/" element={<LoginComponent onLogin={handleLogin} />} />
          <Route
            path="/main"
            element={isLoggedIn ? <LateralMenuComponent /> : <Navigate to="/login" />}
          />
          <Route
            path="/causas-asignadas"
            element={isLoggedIn ? <AssignedCausesComponent /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
