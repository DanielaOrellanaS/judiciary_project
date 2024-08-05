import React, { useState } from 'react';
import '../components.css';
import { getJudgment, saveJudgment, saveOrdersSeizure } from '../Api';
import { useLocation } from 'react-router-dom';
import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import bankOptions from '../bankOptions';

const SeizureOrderComponent = () => {
  const location = useLocation();
  const { numJudgment } = location.state || {};
  const adjudicated = "QUITO CIVIL";
  const orderType = 'SeizureOrder'; 
  const navigate = useNavigate();

  const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString().split('T')[0];
  };

  const numOffice = "UJC-24790-2024-517";

  const handleCancel = () => {
    navigate(-1); 
  };

  function getRandomStatus() {
    const statuses = ['Pendiente', 'OK', 'ERROR'];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
  }
  
  const [retention, setRetention] = useState(''); 

  const handleRetentionChange = (e) => {
    setRetention(e.target.value);
  };

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
      amount: '', 
      bankDefendant: '', 
      accountTypeDefendant: '', 
      accountNumDefendant: '',
      bankBeneficiary: '',
      accountTypeBeneficiary: '',
      accountNumBeneficiary: '', 
      identificationTypeBeneficiary: '', 
      identificationBeneficiary: '', 
      nameBeneficiary: '', 
      lastnameBeneficiary: ''
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

  const handleFormSubmit = async () => {
    try {
      const response = await saveJudgment(formData);
      if (response.ok) {
        alert('Datos guardados correctamente.');
      }
      return true;
    } catch (error) {
      console.error('Datos incompletos', error);
      return false;
    }
  };

  const handleTableSubmit = async () => {
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
          amount: parseFloat(item.amount) || 0,
          bankDefendant: item.bankDefendant || '',
          accountTypeDefendant: item.accountTypeDefendant || '',
          accountNumDefendant: parseFloat(item.accountNumDefendant) || 0,
          bankBeneficiary: item.bankBeneficiary || '',
          accountTypeBeneficiary: item.bankBeneficiary || '',
          accountNumBeneficiary: parseFloat(item.accountNumBeneficiary) || 0,
          identificationTypeBeneficiary: item.identificationTypeBeneficiary || '',
          identificationBeneficiary: item.identificationBeneficiary || '',
          nameBeneficiary: item.nameBeneficiary || '',
          lastnameBeneficiary: item.lastnameBeneficiary || ''
        };
  
        console.log("DATA ENVIADA DESDE SAVE ORDERS: ", JSON.stringify(updatedItem));
        
        const response = await saveOrdersSeizure(updatedItem);
  
        console.log("Order saved successfully:", response);
      }
      return true;
    } catch (error) {
      console.error('Error al guardar los datos de la tabla:', error);
      return false;
    }
  };

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault(); 
    }
  
    try {
      const isFormSaved = await handleFormSubmit();
      
      if (isFormSaved) {
        const isTableSaved = await handleTableSubmit();
        
        if (isTableSaved) {
          alert('Todos los datos se han guardado correctamente.');
          navigate('/transaccion', { state: { numJudgment } });
        } else {
          alert('Error al guardar los datos de la tabla.');
          navigate('/transaccion', { state: { numJudgment } });
        }
      } else {
        alert('Error al guardar los datos del formulario.');
        navigate('/transaccion', { state: { numJudgment } });
      }
    } catch (error) {
      console.error('Error en handleSubmit:', error);
      alert('Ocurrió un error inesperado.');
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
      <form className="transaction-form" onSubmit={handleSubmit}>
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
          <label htmlFor="retention">Auto de Embargo:</label>
          <input
            type="text"
            id="retention"
            name="retention"
            value={retention}
            onChange={handleRetentionChange} 
          />
        </div>
        <div className="form-container" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="fecha">Fecha:</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={formData.date}
              readOnly
            />
          </div>
          <div className="table-header" style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            <IconButton  
              color="primary"  
              onClick={addNewRow}  
              style={{ color: '#797d90', borderRadius: '50%', width: '15px', height: '15px' }}  
            >  
              <AddCircleIcon fontSize="large" />  
            </IconButton>  
            <h2 style={{ margin: 15 }}>Cuentas Ahorros-Corrientes</h2>
          </div>
        </div>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Tipo identificación</th>
              <th>Identificación</th>
              <th>Num Oficio</th>
              <th>Monto</th>
              <th>Banco</th>
              <th>Tipo Cuenta</th>
              <th>Num Cuenta</th>
              <th>Tipo Cuenta Benef</th>
              <th>Num Cuenta</th>
              <th>Tipo Identification</th>
              <th>Identificacion</th>
              <th>Banco</th>
              <th>Nombres</th>
              <th>Apellidos</th>
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
                  <input
                    type="text"
                    id="numOffice"
                    name="numOffice"
                    value={row.numOffice}
                    onChange={(e) => handleTableInputChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="amount"
                    name="amount"
                    value={row.amount}
                    onChange={(e) => handleTableInputChange(index, e)}
                  />
                </td>
                <td>
                  <select
                    id="bankDefendant"
                    name="bankDefendant"
                    value={row.bankDefendant || ''}
                    onChange={(e) => handleTableInputChange(index, e)}
                  >
                    <option value="">Seleccione...</option>
                    {bankOptions.map((bank, idx) => (
                      <option key={idx} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    id="accountTypeDefendant"
                    name="accountTypeDefendant"
                    value={row.accountTypeDefendant}
                    onChange={(e) => handleTableInputChange(index, e)}
                  >
                    <option value="">Seleccione...</option>
                    <option value="ahorros">Ahorros</option>
                    <option value="corriente">Corriente</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    id="accountNumDefendant"
                    name="accountNumDefendant"
                    value={row.accountNumDefendant}
                    onChange={(e) => handleTableInputChange(index, e)}
                  />
                </td>
                <td>
                  <select
                    id="accountTypeBeneficiary"
                    name="accountTypeBeneficiary"
                    value={row.accountTypeBeneficiary}
                    onChange={(e) => handleTableInputChange(index, e)}
                  >
                    <option value="">Seleccione...</option>
                    <option value="ahorros">Ahorros</option>
                    <option value="corriente">Corriente</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    id="accountNumBeneficiary"
                    name="accountNumBeneficiary"
                    value={row.accountNumBeneficiary}
                    onChange={(e) => handleTableInputChange(index, e)}
                  />
                </td>
                <td>
                  <select
                    id="identificationTypeBeneficiary"
                    name="identificationTypeBeneficiary"
                    value={row.identificationTypeBeneficiary}
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
                    id="identificationBeneficiary"
                    name="identificationBeneficiary"
                    value={row.identificationBeneficiary}
                    onChange={(e) => handleTableInputChange(index, e)}
                  />
                </td>
                <td>
                  <select
                    id="bankBeneficiary"
                    name="bankBeneficiary"
                    value={row.bankBeneficiary || ''}
                    onChange={(e) => handleTableInputChange(index, e)}
                  >
                    <option value="">Seleccione...</option>
                    {bankOptions.map((bank, idx) => (
                      <option key={idx} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    id="nameBeneficiary"
                    name="nameBeneficiary"
                    value={row.nameBeneficiary}
                    onChange={(e) => handleTableInputChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="lastnameBeneficiary"
                    name="lastnameBeneficiary"
                    value={row.lastnameBeneficiary}
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
          <Button 
            type="submit" 
            variant="contained" 
            style={{ backgroundColor: '#191e3b', color: 'white', fontSize: '0.7rem', marginRight: '1rem' }}
          >
            Guardar Datos
          </Button>
          <Button variant="contained" style={{ backgroundColor: '#191e3b', color: 'white', fontSize: '0.7rem', marginRight: '1rem' }} onClick={handleCancel}>
              Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SeizureOrderComponent;
