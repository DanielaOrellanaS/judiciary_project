import React from 'react';
import '../components.css';

const SeizureOrderComponent = () => {
  return (
    <div className="transaction-container">
      <form className="transaction-form">
        <div className="form-group">
          <label htmlFor="juzgado">Juzgado:</label>
          <input type="text" id="juzgado" name="juzgado" />
        </div>
        <div className="form-group">
          <label htmlFor="juez">Ordenante:</label>
          <input type="text" id="juez" name="juez" />
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
        <div className="form-group">
          <label htmlFor="ciDemandante">Auto de Embargo Judicial:</label>
          <input type="text" id="ciDemandante" name="ciDemandante" />
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
            <th>Num Oficio</th>
            <th>Banco</th>
            <th>Monto</th>
            <th>Tipo TX</th>
            <th>Tipo Cuenta</th>
            <th>Num Cuenta</th>
            <th>Tipo Identificación</th>
            <th>CI Acreditación</th>
            <th>Banco</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Estado TX</th>
            <th>Fecha Respuesta</th>
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

export default SeizureOrderComponent;
