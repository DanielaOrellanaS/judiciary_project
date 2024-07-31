import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../components.css';
import { getBankResponse, getOrders } from '../../Api';

const RequireDataTableComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, numJudgment } = location.state || {};
  const orderType = 'RequireData';

  const [combinedData, setCombinedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bankData = await getBankResponse();
        const ordersData = (await getOrders()).filter(order => order.orderType === orderType);
        if (bankData.length > 0) {
          const combined = ordersData.map(item => {
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
      } finally {
        setIsLoading(false); 
      }
    };

    fetchData();
  }, []);

  const renderTable = () => {
    return (
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Num. Oficio</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Cédula</th>
            <th>Estado</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {combinedData.map(item => (
            <tr key={item.idOrders}>
              <td>{new Date(item.responseDate).toLocaleDateString()}</td>
              <td>{item.numOffice}</td>
              <td>{item.nameDefendant}</td>
              <td>{item.lastnameDefendant}</td>
              <td>{item.identificationDefendant}</td>
              <td>{item.transactionStatus}</td>
              <td>
                <button onClick={() => navigate('/edit-require-data', { state: { idJudgment: item.idJudgment, numJudgment: numJudgment } })}>
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };  

  const handleNewButtonClick = () => {
    navigate('/require-data', { state: { numJudgment } });
  };  

  return (
    <div className="resume-table-container">
      <div className="header-container">
        <h1>{title}</h1>
        <button className="new-button" onClick={handleNewButtonClick}>+ Nuevo</button>
      </div>
      {isLoading ? <p>Cargando...</p> : renderTable()}
    </div>
  );
};

export default RequireDataTableComponent;
