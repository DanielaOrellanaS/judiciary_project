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
import RequireDataTableComponent from './components/tableComponents/RequireDataTableComponent';
import RetentionOrderTableComponent from './components/tableComponents/RetentionOrderTableComponent';
import ReleaseOrderTableComponent from './components/tableComponents/ReleaseOrderTableComponent';
import SeizureOrderTableComponent from './components/tableComponents/SeizureOrderTableComponent';
import EditRetentionOrderComponent from './components/editComponents/EditRetentionOrderComponent';
import EditRequireDataComponent from './components/editComponents/EditRequireComponent';
import EditReleaseOrderComponent from './components/editComponents/EditReleaseOrderComponent';

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
            path="/require-data"
            element={isLoggedIn ? <RequireDataComponent /> : <Navigate to="/" />}
          />
          <Route
            path="/table-require-data"
            element={isLoggedIn ? <RequireDataTableComponent /> : <Navigate to="/" />}
          />
          <Route
            path="/edit-require-data"
            element={isLoggedIn ? <EditRequireDataComponent /> : <Navigate to="/" />}
          />
          <Route
            path="/retention-order"
            element={isLoggedIn ? <RetentionOrderComponent /> : <Navigate to="/" />}
          />
          <Route
            path="/table-retention-order"
            element={isLoggedIn ? <RetentionOrderTableComponent /> : <Navigate to="/" />}
          />
          <Route
            path="/edit-retention-order"
            element={isLoggedIn ? <EditRetentionOrderComponent /> : <Navigate to="/" />}
          />
          <Route
            path="/release-order"
            element={isLoggedIn ? <ReleaseOrderComponent /> : <Navigate to="/" />}
          />
          <Route
            path="/table-release-order"
            element={isLoggedIn ? <ReleaseOrderTableComponent /> : <Navigate to="/" />}
          />
          <Route
            path="/edit-release-order"
            element={isLoggedIn ? <EditReleaseOrderComponent /> : <Navigate to="/" />}
          />
          <Route
            path="/seizure-order"
            element={isLoggedIn ? <SeizureOrderComponent /> : <Navigate to="/" />}
          />
          <Route
            path="/table-seizure-order"
            element={isLoggedIn ? <SeizureOrderTableComponent /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
