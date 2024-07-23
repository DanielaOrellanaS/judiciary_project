import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../components.css';
import { getBankResponse, getJudgment } from '../Api';

const ResumeTableComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title } = location.state || {};

  const [combinedData, setCombinedData] = useState([]);

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

  const renderTable = () => {
    switch (title) {
      case 'Requerir Datos Cuenta':
        return (
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Num. Oficio</th>
                <th>Nombres</th>
                <th>Cédula</th>
                <th>Estado</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {combinedData.map(item => (
                <tr key={item.idJudgment}>
                  <td>{new Date(item.responseDate).toLocaleDateString()}</td>
                  <td>{item.accountNum}</td>
                  <td>{item.name}</td>
                  <td>{item.identification}</td>
                  <td>{item.accountStatus}</td>
                  <td><button>Editar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'Orden Retención':
      case 'Orden de Liberación':
      case 'Orden de Embargo':
        return (
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Num. Oficio</th>
                <th>Nombres</th>
                <th>Cédula</th>
                <th>Monto</th>
                <th>Banco</th>
                <th>Editar</th>
                <th>Estado</th>         
              </tr>
            </thead>
            <tbody>
              {combinedData.map(item => (
                <tr key={item.idJudgment}>
                  <td>{new Date(item.responseDate).toLocaleDateString()}</td>
                  <td>{item.accountNum}</td>
                  <td>{item.name}</td>
                  <td>{item.identification}</td>
                  <td>{item.accountType}</td>
                  <td>{item.bank}</td>
                  <td><button>Editar</button></td>
                  <td>{item.accountStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  const handleNewButtonClick = () => {
    switch (title) {
      case 'Requerir Datos Cuenta':
        navigate('/requerir-datos-cuenta');
        break;
      case 'Orden Retención':
        navigate('/orden-retencion');
        break;
      case 'Orden de Liberación':
        navigate('/orden-liberacion');
        break;
      case 'Orden de Embargo':
        navigate('/orden-embargo');
        break;
      default:
        break;
    }
  };

  return (
    <div className="resume-table-container">
      <div className="header-container">
        <h1>{title}</h1>
        <button className="new-button" onClick={handleNewButtonClick}>+ Nuevo</button>
      </div>
      {renderTable()}
    </div>
  );
};

export default ResumeTableComponent;
