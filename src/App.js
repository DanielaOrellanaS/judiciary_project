import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import HeaderComponent from './components/HeaderComponent';
import LateralMenuComponent from './components/LateralMenuComponent';
import AssignedCausesComponent from './components/AssignedCausesComponent';
import MenuTransactionComponent from './components/MenuTransactionComponent';
import RequireDataComponent from './components/RequireDataComponent';
import RetentionOrderComponent from './components/RetentionOrderComponent';
import ReleaseOrderComponent from './components/ReleaseOrderComponent';
import SeizureOrderComponent from './components/SeizureOrderComponent';
import ResumeTableComponent from './components/ResumeTableComponent';

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
          <Route
            path="/transaccion"
            element={isLoggedIn ? <MenuTransactionComponent /> : <Navigate to="/" />}
          />
          <Route
            path="/requerir-datos-cuenta"
            element={isLoggedIn ? <RequireDataComponent /> : <Navigate to="/" />}
          />
          <Route
            path="/orden-retencion"
            element={isLoggedIn ? <RetentionOrderComponent /> : <Navigate to="/" />}
          />
          <Route
            path="/orden-liberacion"
            element={isLoggedIn ? <ReleaseOrderComponent /> : <Navigate to="/" />}
          />
          <Route
            path="/orden-embargo"
            element={isLoggedIn ? <SeizureOrderComponent /> : <Navigate to="/" />}
          />
          <Route
            path="/resume-table"
            element={isLoggedIn ? <ResumeTableComponent /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
