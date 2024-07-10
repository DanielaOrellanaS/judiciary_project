import React from 'react';
import '../components.css';

const RequireDataComponent = () => {
  return (
    <div className="transaction-container">
      <form className="transaction-form">
        <div className="form-group">
          <label htmlFor="juzgado">Juzgado:</label>
          <input type="text" id="juzgado" name="juzgado" />
        </div>
        <div className="form-group">
          <label htmlFor="juez">Juez:</label>
          <input type="text" id="juez" name="juez" />
        </div>
        <div className="form-group">
          <label htmlFor="oficio">Oficio No:</label>
          <input type="text" id="oficio" name="oficio" />
        </div>
        <div className="form-group">
          <label htmlFor="mail">Mail:</label>
          <input type="email" id="mail" name="mail" />
        </div>
        <div className="form-group">
          <label htmlFor="cargo">Cargo:</label>
          <input type="text" id="cargo" name="cargo" />
        </div>
        <div className="form-group">
          <label htmlFor="juicio">Juicio:</label>
          <input type="text" id="juicio" name="juicio" />
        </div>
        <div className="form-group">
          <label htmlFor="datosAccionado">Datos accionado:</label>
          <input type="text" id="datosAccionado" name="datosAccionado" />
        </div>
        <div className="form-group">
          <label htmlFor="ciDemandante">CI Demandante:</label>
          <input type="text" id="ciDemandante" name="ciDemandante" />
        </div>
        <div className="form-group">
          <label htmlFor="fecha">Fecha:</label>
          <input type="date" id="fecha" name="fecha" />
        </div>
      </form>
      <div className="table-header">
        <h2>Cuentas Ahorros-Corrientes</h2>
      </div>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Tipo identificación</th>
            <th>Identificación</th>
            <th>Tipo de cuenta</th>
            <th>Banco</th>
            <th>Cuenta No.</th>
            <th>Estado de cuenta</th>
            <th>Fecha respuesta</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ejemplo</td>
            <td>Ejemplo</td>
            <td>Ejemplo</td>
            <td>Ejemplo</td>
            <td>Ejemplo</td>
            <td>Ejemplo</td>
            <td>Ejemplo</td>
            <td>Ejemplo</td>
            <td>Ejemplo</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RequireDataComponent;
