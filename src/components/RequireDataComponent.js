import React, { useState } from 'react';
import '../components.css';
import { getJudgment, saveJudgment, saveOrders } from '../Api';
import { useLocation } from 'react-router-dom';
import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

const RequireDataComponent = () => {
  const location = useLocation();
  const { numJudgment } = location.state || {};
  const adjudicated = "QUITO CIVIL";
  const orderType = 'RequireData'; 

  const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString().split('T')[0];
  };

  const numOffice = "UJC-24790-2024-517";

  function getRandomStatus() {
    const statuses = ['Pendiente', 'OK', 'ERROR'];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
  }
  
  const [formData, setFormData] = useState({
    numJudgment: numJudgment || '0',
    adjudicated: adjudicated || '',
    judge: '',
    mailOrderer: '', 
    nameOrderer: '', 
    positionOrderer: '',
    name: '',
    lastname: '', 
    identificationType: '',
    identification: '',
    date: getCurrentDate() || ''
  });

  const [tableData, setTableData] = useState([
    { 
      orderType: orderType || '', 
      transactionStatus: getRandomStatus() || '',
      numOffice: numOffice || '', 
      nameDefendant: '',
      lastnameDefendant: '',
      identificationTypeDefendant: '', 
      identificationDefendant: '', 
    }
  ]);

  const handleFormInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTableInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedTableData = tableData.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setTableData(updatedTableData);
  };

  const handleFormSubmit = async (event) => {
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
    }
  };

  const handleTableSubmit = async (event) => {
    event.preventDefault();
    const judgmentData = await getJudgment();
  
    const lastJudgmentId = judgmentData.reduce((maxId, judgment) => {
      return judgment.idJudgment > maxId ? judgment.idJudgment : maxId;
    }, 0);
  
    try {
      for (const item of tableData) {
        const updatedItem = {
          orderType: orderType || '',
          transactionStatus: getRandomStatus() || '',
          numOffice: numOffice || '',
          nameDefendant: item.nameDefendant || '',
          lastnameDefendant: item.lastnameDefendant || '',
          identificationTypeDefendant: item.identificationTypeDefendant || '',
          identificationDefendant: item.identificationDefendant || '',
          idJudgment: lastJudgmentId,
        };
  
        console.log("DATA ENVIADA DESDE SAVE ORDERS: ", JSON.stringify(updatedItem));
  
        const response = await saveOrders(updatedItem);
        const responseData = await response.json(); 
        console.log("RESPONSE OF REQUIRE DATA: ", responseData);
        if (!response.ok) {
          throw new Error(responseData.detail || 'Failed to save orders data');
        }
      }
  
      alert('Datos de la tabla guardados correctamente.');
    } catch (error) {
      console.error('Error al guardar los datos de la tabla:', error);
      alert('Error al guardar los datos de la tabla: ' + error.message);
    }
  };
  

  const addNewRow = () => {
    setTableData([
      ...tableData,
      { orderType: orderType || '', transactionStatus: getRandomStatus() || '', numOffice: numOffice || '', nameDefendant: '', lastnameDefendant: '', identificationTypeDefendant: '', identificationDefendant: '' }
    ]);
  };

  const deleteRow = (index) => {
    const updatedTableData = tableData.filter((_, i) => i !== index);
    setTableData(updatedTableData);
  };

  return (
    <div className="transaction-container">
      <form className="transaction-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="adjudicated">Juzgado:</label>
          <input
            type="text"
            id="adjudicated"
            name="adjudicated"
            value={formData.adjudicated}
            onChange={handleFormInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="judge">Juez:</label>
          <input
            type="text"
            id="judge"
            name="judge"
            value={formData.judge}
            onChange={handleFormInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="oficio">Oficio No:</label>
          <input
            type="text"
            id="oficio"
            name="oficio"
            value={numOffice}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="mailOrderer">Mail:</label>
          <input
            type="text"
            id="mailOrderer"
            name="mailOrderer"
            value={formData.mailOrderer}
            onChange={handleFormInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="positionOrderer">Cargo:</label>
          <input
            type="text"
            id="positionOrderer"
            name="positionOrderer"
            value={formData.positionOrderer}
            onChange={handleFormInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="numJudgment">Juicio:</label>
          <input
            type="text"
            id="numJudgment"
            name="numJudgment"
            value={formData.numJudgment}
            onChange={handleFormInputChange}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Datos accionado:</label>
          <div className="input-group">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleFormInputChange}
              placeholder="Nombres"
            />
            <div>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleFormInputChange}
                placeholder="Apellidos"
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="identificationType">Tipo Identificación:</label>
          <select
            id="identificationType"
            name="identificationType"
            value={formData.identificationType}
            onChange={handleFormInputChange}
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
            onChange={handleFormInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fecha">Fecha:</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={formData.date}
            readOnly
          />
        </div>
        <div className="form-submit" style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>  
          <Button type="submit" variant="contained" style={{ backgroundColor: 'green', color: 'white', fontSize: '0.7rem' }}>  
              Guardar  
          </Button>  
        </div>
      </form>
      <div className="table-header" style={{ display: 'flex', alignItems: 'center' }}>   
          <IconButton  
              color="primary"  
              onClick={addNewRow}  
              style={{ color: 'green', borderRadius: '50%', width: '15px', height: '15px' }}  
          >  
              <AddCircleIcon fontSize="large" />  
          </IconButton>  
          <h2 style={{ margin: 15 }}>Cuentas Ahorros-Corrientes</h2> 
      </div>
      <form onSubmit={handleTableSubmit}>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Tipo identificación</th>
              <th>Identificación</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    id="nameDefendant"
                    name="nameDefendant"
                    value={row.nameDefendant}
                    onChange={(e) => handleTableInputChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="lastnameDefendant"
                    name="lastnameDefendant"
                    value={row.lastnameDefendant}
                    onChange={(e) => handleTableInputChange(index, e)}
                  />
                </td>
                <td>
                  <select
                    id="identificationTypeDefendant"
                    name="identificationTypeDefendant"
                    value={row.identificationTypeDefendant}
                    onChange={(e) => handleTableInputChange(index, e)}
                  >
                    <option value="">Seleccione...</option>
                    <option value="cedula">Cédula</option>
                    <option value="pasaporte">Pasaporte</option>
                    <option value="ruc">RUC</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    id="identificationDefendant"
                    name="identificationDefendant"
                    value={row.identificationDefendant}
                    onChange={(e) => handleTableInputChange(index, e)}
                  />
                </td>
                <td>
                  <IconButton color="secondary" onClick={() => deleteRow(index)}>
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="table-actions" style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>  
            <Button type="submit" variant="contained" style={{ backgroundColor: 'green', color: 'white', fontSize: '0.7rem' }}>  
                Guardar Datos  
            </Button>  
        </div>
      </form>
    </div>
  );
};

export default RequireDataComponent;
