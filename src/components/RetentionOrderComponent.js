import React, { useEffect, useState } from 'react';
import '../components.css';
import { useLocation } from 'react-router-dom';
import { getBankResponse, getJudgment } from '../Api';

const RetentionOrderComponent = () => {

  const location = useLocation();
  const { numJudgment } = location.state || {};
  const [combinedData, setCombinedData] = useState([]);

  function generateRandomOffice() {
    const randomPart = Math.floor(10000 + Math.random() * 90000); 
    const year = new Date().getFullYear(); 
    const suffix = Math.floor(100 + Math.random() * 900); 
    return `UJC-${randomPart}-${year}-${suffix}`;
  }

  const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString().split('T')[0]; 
  };

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

  if (combinedData.length === 0) {
    return <div>Loading...</div>;
  }

  const formData = combinedData[0];

  return (
    <div className="transaction-container">
      <form className="transaction-form">
        <div className="form-group">
          <label htmlFor="adjudicated">Juzgado:</label>
          <input
            type="text"
            id="adjudicated"
            name="adjudicated"
            value={formData.adjudicated}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="judge">Juez:</label>
          <input
            type="text"
            id="judge"
            name="judge"
            value={formData.judge}
            readOnly
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
          <label htmlFor="name">Datos accionado:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="identificationType">Tipo Identificacion:</label>
          <input
            type="text"
            id="identificationType"
            name="identificationType"
            value={formData.identificationType}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="identification">Identificacion Demandante:</label>
          <input
            type="text"
            id="identification"
            name="identification"
            value={formData.identification}
            readOnly
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
        <div className="form-group">
          <label htmlFor="judicialRetentionOrder">Auto de Retencion Judicial:</label>
          <input
            type="text"
            id="judicialRetentionOrder"
            name="judicialRetentionOrder"
            defaultValue={"Retener de la cuenta#.... que pertenece al señor  la cantidad de $ 2000"}
            readOnly
          />
        </div>
      </form>
      <div className="table-header">
        <h2>Cuentas Ahorros-Corrientes</h2>
      </div>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Tipo identificación</th>
            <th>Identificacion</th>
            <th>Tipo de cuenta</th>
            <th>Numero Oficio</th>
            <th>Banco</th>
            <th>Monto</th>
            <th>CTA</th>
            <th>Estado TX</th>
            <th>Fecha Respuesta</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{formData.name}</td>
            <td>{formData.identificationType}</td>
            <td>{formData.identification}</td>
            <td>{formData.accountType}</td>
            <td>{formData.numJudgment}</td>
            <td>{formData.bank}</td>
            <td>{"1000"}</td>
            <td>{"2001213"}</td>
            <td>{formData.accountStatus}</td>
            <td>{new Date(formData.responseDate).toLocaleDateString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RetentionOrderComponent;
