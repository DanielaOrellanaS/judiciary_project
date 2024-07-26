import React, { useEffect, useState } from 'react';
import '../components.css';
import { useLocation } from 'react-router-dom';
import { getBankResponse, getJudgment, getOrders } from '../Api';

const ReleaseOrderComponent = () => {
  const location = useLocation();
  const { numJudgment } = location.state || {};
  const [combinedData, setCombinedData] = useState([]);
  const [tableData, setTableData] = useState({
    numJudgment: '',
    bank: '',
    amount: '',
    cta: '',
    accountStatus: '',
    responseDate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTableData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'amount' && value) {
      updateStatusAndDate();
    }
  };

  const updateStatusAndDate = () => {
    const randomIndex = Math.floor(Math.random() * combinedData.length);
    const randomBankResponse = combinedData[randomIndex];
    
    setTableData(prevState => ({
      ...prevState,
      accountStatus: randomBankResponse.accountStatus,
      responseDate: randomBankResponse.responseDate
    }));
  };

  const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const judgmentData = await getJudgment();
        const bankData = await getBankResponse();
        const ordersData = await getOrders();

        const sortedOrders = ordersData.sort((a, b) => b.idOrder - a.idOrder); 
        const lastOrder = sortedOrders[0] || {};

        if (bankData.length > 0) {
          const combined = judgmentData.map(item => {
            return {
              ...item,
              accountType: bankData[0]?.accountType || '',
              bank: bankData[0]?.bank || '',
              accountNum: bankData[0]?.accountNum || '',
              accountStatus: bankData[0]?.accountStatus || '',
              responseDate: bankData[0]?.responseDate || '',
              orderData: lastOrder
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
          <label htmlFor="judicialReleaseOrder">Auto de Liberacion Judicial:</label>
          <input
            type="text"
            id="judicialReleaseOrder"
            name="judicialReleaseOrder"
            value={"2000"}
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
            <th>Numero Oficio</th>
            <th>Banco</th>
            <th>Monto</th>
            <th>Tipo de cuenta</th>
            <th>CTA</th>
            <th>Estado TX</th>
            <th>Fecha Respuesta</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{formData.orderData.nameDefendant}</td>
            <td>{formData.orderData.identificationTypeDefendant}</td>
            <td>{formData.orderData.identificationDefendant}</td>
            <td>{formData.numJudgment}</td>
            <td>
              <input
                type="text"
                name="bank"
                value={formData.bank}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="amount"
                value={tableData.amount}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="accountType"
                value={formData.accountType}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="cta"
                value={formData.accountNum}
                onChange={handleInputChange}
              />
            </td>
            <td>{tableData.accountStatus}</td>
            <td>{tableData.responseDate ? new Date(tableData.responseDate).toLocaleDateString() : ''}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReleaseOrderComponent;
