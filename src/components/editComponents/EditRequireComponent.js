import React, { useState, useEffect } from 'react';
import '../../components.css';
import { getJudgmentById, updateJudgment, getOrdersByJudgmentIdAndOrderType, getBankResponse, getBankResponseById, getJudgment, updateOrders } from '../../Api';
import { useLocation } from 'react-router-dom';
import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const EditRequireDataComponent = () => {
  const location = useLocation();
  const { idJudgment, numJudgment } = location.state || {};
  const orderType = 'RequireData';
  const navigate = useNavigate();

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

  function getRandomId(ids) {
    const randomIndex = Math.floor(Math.random() * ids.length);
    return ids[randomIndex];
  }    

  const [formData, setFormData] = useState({
    numJudgment: '',
    adjudicated: '',
    judge: '',
    mailOrderer: '', 
    positionOrderer: '',
    name: '',
    lastname: '', 
    identificationType: '',
    identification: '',
    date: getCurrentDate() || ''
  });

  const [tableData, setTableData] = useState([
    { 
      orderType: '', 
      transactionStatus: getRandomStatus(),
      numOffice: '', 
      nameDefendant: '',
      lastnameDefendant: '',
      identificationTypeDefendant: '', 
      identificationDefendant: '', 
      accountType: '', 
      bank: '', 
      accountNum: '',
      accountStatus: '', 
      responseDate: ''
    }
  ]);

  useEffect(() => {
    const fetchJudgmentData = async () => {
      try {
        const data = await getJudgmentById(idJudgment);
        const tableData = await getOrdersByJudgmentIdAndOrderType(idJudgment, orderType); 
        console.log("DATOS FILTRADOS: ", tableData)
        const randomResponse = await getBankResponse().then(allResponses => getBankResponseById(getRandomId(allResponses.map(response => response.id))));
        setFormData({
          judge: data.judge || '',
          adjudicated: data.adjudicated || '',
          numJudgment: data.numJudgment || '',
          mailOrderer: data.mailOrderer || '',
          positionOrderer: data.positionOrderer || '',
          name: data.name || '',
          lastname: data.lastname || '',
          identificationType: data.identificationType || '',
          identification: data.identification || '',
          date: data.date || getCurrentDate(),
        });

        setTableData(tableData.map(item => ({
            idOrder: item.idOrder || '',
            identificationDefendant: item.identificationDefendant || '',
            identificationTypeDefendant: item.identificationTypeDefendant || '',
            lastnameDefendant: item.lastnameDefendant || '',
            nameDefendant: item.nameDefendant || '',
            numOffice: item.numOffice || '',
            orderType: item.orderType || '',
            transactionStatus: item.transactionStatus || '',
            accountType: randomResponse.accountType || '',
            accountNum: randomResponse.accountNum || '',
            accountStatus: randomResponse.accountStatus || '',
            responseDate: randomResponse.responseDate || '',
            bank: randomResponse.bank || '',
          })));
          
      } catch (error) {
        console.error('Error fetching judgment data:', error);
      }
    };

    fetchJudgmentData();
  }, [idJudgment]);

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
      const response = await updateJudgment(idJudgment, formData);
      if (response.ok) {
        alert('Datos guardados correctamente.');
      }
      return true;
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
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
        };
  
        console.log("DATA ENVIADA DESDE SAVE ORDERS: ", JSON.stringify(updatedItem));
  
        const response = await updateOrders(item.idOrder, updatedItem);
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error("RESPONSE ERROR DATA: ", errorData);
          throw new Error(errorData.detail || 'Failed to save orders data');
        }
      }
  
      alert('Datos de la tabla guardados correctamente.');
      return true;
    } catch (error) {
      console.error('Error al guardar los datos de la tabla:', error);
      alert('Error al guardar los datos de la tabla: ' + error.message);
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
      navigate('/transaccion', { state: { numJudgment } });
    }
  };

  const addNewRow = () => {
    setTableData([
      ...tableData,
      { orderType: orderType, transactionStatus: getRandomStatus(), numOffice: numOffice, nameDefendant: '', lastnameDefendant: '', identificationTypeDefendant: '', identificationDefendant: '' }
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
          <label htmlFor="fecha">Fecha:</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={formData.date}
            readOnly
          />
        </div>
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
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Tipo Identificación</th>
              <th>Identificación</th>
              <th>Tipo Cuenta</th>
              <th>Num Cuenta</th>
              <th>Banco</th>
              <th>Estado Cuenta</th>
              <th>Fecha Respuesta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
          {tableData.map((row, index) => {
            return (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    name="nameDefendant"
                    value={row.nameDefendant || ''} 
                    onChange={(event) => handleTableInputChange(index, event)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="lastnameDefendant"
                    value={row.lastnameDefendant || ''}
                    onChange={(event) => handleTableInputChange(index, event)}
                  />
                </td>
                <td>
                  <select
                    name="identificationTypeDefendant"
                    value={row.identificationTypeDefendant || ''}
                    onChange={(event) => handleTableInputChange(index, event)}
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
                    name="identificationDefendant"
                    value={row.identificationDefendant || ''}
                    onChange={(event) => handleTableInputChange(index, event)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="accountType"
                    value={row.accountType || ''}
                    onChange={(event) => handleTableInputChange(index, event)}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="accountNum"
                    value={row.accountNum || ''}
                    onChange={(event)=> handleTableInputChange(index, event)}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="bank"
                    value={row.bank || ''}
                    onChange={(event) => handleTableInputChange(index, event)}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="accountStatus"
                    value={row.accountStatus || ''}
                    onChange={(event) => handleTableInputChange(index, event)}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="responseDate"
                    value={row.responseDate || ''}
                    onChange={(event) => handleTableInputChange(index, event)}
                    readOnly
                  />
                </td>
                <td>
                  <IconButton onClick={() => deleteRow(index)}>
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            );
          })}

          </tbody>
        </table>
        <div className="table-actions">
          <div className="table-actions" style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>  
            <Button type="submit" variant="contained" style={{ backgroundColor: 'green', color: 'white', fontSize: '0.7rem' }}>  
                Actualizar Datos  
            </Button>  
        </div>
        </div>
      </form>
    </div>
  );
};

export default EditRequireDataComponent;
