import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../components.css';
import { getBankResponse, getOrdersSeizure } from '../../Api';
import { Button } from '@mui/material';

const SeizureOrderTableComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, numJudgment } = location.state || {};
  const orderType = 'SeizureOrder';

  const [combinedData, setCombinedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  const handleCancel = () => {
    navigate(-1); 
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bankData = await getBankResponse();
        const ordersData = (await getOrdersSeizure()).filter(order => order.orderType === orderType);
        console.log("DATOS RECIBIDOS: ", ordersData)

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
      <div>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Num. Oficio</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Cédula</th>
              <th>Monto</th>
              <th>Banco</th>
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
                <td>{item.amount}</td>
                <td>{item.bank}</td>
                <td>{item.transactionStatus}</td>
                <td>
                  <button onClick={() => navigate('/edit-seizure-order', { state: { idJudgment: item.idJudgment, numJudgment: numJudgment } })}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button variant="contained" style={{ backgroundColor: 'green', color: 'white', fontSize: '0.7rem', marginRight: '1rem', marginTop: '1rem' }} onClick={handleCancel}>
            Regresar
        </Button>
      </div>
    );
  };  

  const handleNewButtonClick = () => {
    navigate('/seizure-order', { state: { numJudgment } });
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

export default SeizureOrderTableComponent;
