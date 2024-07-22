import React, { useState, useEffect } from 'react';
import '../components.css';
import { getBankResponse, getJudgment, saveJudgment } from '../Api';
import { useLocation } from 'react-router-dom';

const RequireDataComponent = () => {

  const location = useLocation();
  const { numJudgment } = location.state || {};

  const [formData, setFormData] = useState({
    numJudgment: numJudgment || '0',
    adjudicated: '',
    judge: '',
    identificationType: '',
    identification: '',
    name: '',
  });

  const [combinedData, setCombinedData] = useState([]);
  
  const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString().split('T')[0]; 
  };

  function generateRandomOffice() {
    const randomPart = Math.floor(10000 + Math.random() * 90000); 
    const year = new Date().getFullYear(); 
    const suffix = Math.floor(100 + Math.random() * 900); 
    return `UJC-${randomPart}-${year}-${suffix}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const judgmentData = await getJudgment();

        const bankData = await getBankResponse();
        if (bankData.length > 0) {
          const combined = judgmentData.map(item => {
            const randomIndex = Math.floor(Math.random() * bankData.length);
            const randomBankResponse = bankData[randomIndex];
            
            return {
              ...item,
              accountType: randomBankResponse.accountType,
              bank: randomBankResponse.bank,
              accountNum: randomBankResponse.accountNum,
              accountStatus: randomBankResponse.accountStatus,
              responseDate: randomBankResponse.responseDate
            };
          });

          setCombinedData(combined);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await saveJudgment(formData);
      if (response.ok) {
        alert('Datos guardados correctamente.');
      } else {
        alert('Hubo un problema al guardar los datos.');
      }
    } catch (error) {
      console.error('Datos incompletos', error);
      alert('Error al guardar los datos: ' + error.message);
    }
  };

  return (
    <div className="transaction-container">
      <form className="transaction-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="adjudicated">Juzgado:</label>
          <input
            type="text"
            id="adjudicated"
            name="adjudicated"
            value={formData.adjudicated}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="judge">Juez:</label>
          <input
            type="text"
            id="judge"
            name="judge"
            value={formData.judge}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="oficio">Oficio No:</label>
          <input
            type="text"
            id="oficio"
            name="oficio"
            value={generateRandomOffice()}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="mail">Mail:</label>
          <input
            type="email"
            id="mail"
            name="mail"
            value={"jsegalla@cnj.gob.ec"}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="cargo">Cargo:</label>
          <input
            type="text"
            id="cargo"
            name="cargo"
            value={"Secretario"}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="numJudgment">Juicio:</label>
          <input
            type="text"
            id="numJudgment"
            name="numJudgment"
            value={formData.numJudgment}
            onChange={handleInputChange}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Datos accionado:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="identificationType">Tipo Identificacion:</label>
          <select
            id="identificationType"
            name="identificationType"
            value={formData.identificationType}
            onChange={handleInputChange}
          >
            <option value="">Seleccione...</option>
            <option value="cedula">Cédula</option>
            <option value="pasaporte">Pasaporte</option>
            <option value="ruc">RUC</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="identification">Identificacion Demandante:</label>
          <input
            type="text"
            id="identification"
            name="identification"
            value={formData.identification}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fecha">Fecha:</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={getCurrentDate()}
            readOnly
          />
        </div>
        <button type="submit">Guardar</button>
      </form>
      <div className="table-header">
        <h2>Cuentas Ahorros-Corrientes</h2>
      </div>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Nombres</th>
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
          {combinedData.map((item) => (
            <tr key={item.idJudgment}>
              <td>{item.name}</td>
              <td>{item.identificationType}</td>
              <td>{item.identification}</td>
              <td>{item.accountType}</td>
              <td>{item.bank}</td>
              <td>{item.accountNum}</td>
              <td>{item.accountStatus}</td>
              <td>{new Date(item.responseDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequireDataComponent;
