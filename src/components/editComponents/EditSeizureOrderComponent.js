import React, { useState, useEffect } from 'react';
import '../../components.css';
import { getJudgmentById, updateJudgment, getOrdersSeizureByJudgmentIdAndOrderType, getBankResponse, getBankResponseById, getJudgment, updateOrdersSeizure } from '../../Api';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import bankOptions from '../../bankOptions';
import { FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const EditSeizureOrderComponent = () => {
  const location = useLocation();
  const { idJudgment, numJudgment } = location.state || {};
  const orderType = 'SeizureOrder';
  const navigate = useNavigate();

  const numOffice = "UJC-24790-2024-517";

  const handleCancel = () => {
    navigate(-1); 
  };

  const formatDate = (isoString) => {
    return isoString.split('T')[0];
  };

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
    numJudgment: numJudgment || '',
    adjudicated: '',
    judge: '',
    mailOrderer: '', 
    positionOrderer: '',
    name: '',
    lastname: '', 
    identificationType: '',
    identification: '',
    date: ''
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
      lastnameBeneficiary: '',
      responseDate: ''
    }
  ]);

  useEffect(() => {
    const fetchJudgmentData = async () => {
      try {
        const data = await getJudgmentById(idJudgment);
        const tableData = await getOrdersSeizureByJudgmentIdAndOrderType(idJudgment, orderType); 
        console.log("DATOS FILTRADOS: ", tableData)
        const randomResponse = await getBankResponse().then(allResponses => getBankResponseById(getRandomId(allResponses.map(response => response.id))));
        setFormData({
          judge: data.judge || '',
          adjudicated: data.adjudicated || '',
          numJudgment: numJudgment || '',
          mailOrderer: data.mailOrderer || '',
          positionOrderer: data.positionOrderer || '',
          name: data.name || '',
          lastname: data.lastname || '',
          identificationType: data.identificationType || '',
          identification: data.identification || '',
          date: formatDate(data.date) || ''
        });

        setTableData(tableData.map(item => ({
            idOrder: item.idOrder || '',
            identificationDefendant: item.identificationDefendant || '',
            identificationTypeDefendant: item.identificationTypeDefendant || '',
            lastnameDefendant: item.lastnameDefendant || '',
            nameDefendant: item.nameDefendant || '',
            numOffice: item.numOffice || '',
            orderType: item.orderType || '',
            accountType: item.accountType || '',
            accountNum: item.accountNum || '',
            accountStatus: item.accountStatus || '',
            bank: item.bank || '',
            idJudgment: item.lastJudgmentId || '',
            amount: parseFloat(item.amount) || 0,
            bankDefendant: item.bankDefendant || '',
            accountTypeDefendant: item.accountTypeDefendant || '',
            accountNumDefendant: parseFloat(item.accountNumDefendant) || 0,
            bankBeneficiary: item.bankBeneficiary || '',
            accountTypeBeneficiary: item.accountTypeBeneficiary || '',
            accountNumBeneficiary: parseFloat(item.accountNumBeneficiary) || 0,
            identificationTypeBeneficiary: item.identificationTypeBeneficiary || '',
            identificationBeneficiary: item.identificationBeneficiary || '',
            nameBeneficiary: item.nameBeneficiary || '',
            lastnameBeneficiary: item.lastnameBeneficiary || '',
            transactionStatus: randomResponse.txStatus || '',
            responseDate: formatDate(randomResponse.responseDate) || ''
          })));
          
      } catch (error) {
        console.error('Error fetching judgment data:', error);
      }
    };

    fetchJudgmentData();
  }, [idJudgment, numJudgment]);

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
        
        const response = await updateOrdersSeizure(item.idOrder, updatedItem);
  
        console.log("Order saved successfully:", response);
      }
      return true;
    } catch (error) {
      console.log('Error al guardar los datos de la tabla:', error);
      return false;
    }
  };   

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault(); 
    }
  
    const confirmed = window.confirm('¿Estás seguro de que deseas guardar los datos?');
    if (!confirmed) {
      return;
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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Juzgado"
                id="adjudicated"
                name="adjudicated"
                value={formData.adjudicated}
                onChange={handleFormInputChange}
                variant="outlined"
                margin="normal"
              />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Juez"
              id="judge"
              name="judge"
              value={formData.judge}
              onChange={handleFormInputChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Oficio No"
              id="oficio"
              name="oficio"
              value={numOffice}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mail"
              id="mailOrderer"
              name="mailOrderer"
              value={formData.mailOrderer}
              onChange={handleFormInputChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Cargo"
              id="positionOrderer"
              name="positionOrderer"
              value={formData.positionOrderer}
              onChange={handleFormInputChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Juicio"
              id="numJudgment"
              name="numJudgment"
              value={formData.numJudgment}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
          <label htmlFor="name" className="form-label">Datos accionado:</label>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nombres"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleFormInputChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Apellidos"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleFormInputChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel id="identificationType-label">Tipo Identificación</InputLabel>
              <Select
                labelId="identificationType-label"
                id="identificationType"
                name="identificationType"
                value={formData.identificationType}
                onChange={handleFormInputChange}
                label="Tipo Identificación"
              >
                <MenuItem value="">
                  <em>Seleccione...</em>
                </MenuItem>
                <MenuItem value="cedula">Cédula</MenuItem>
                <MenuItem value="pasaporte">Pasaporte</MenuItem>
                <MenuItem value="ruc">RUC</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Identificacion"
                id="identification"
                name="identification"
                value={formData.identification}
                onChange={handleFormInputChange}
                variant="outlined"
                margin="normal"
              />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Fecha"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleFormInputChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
        </Grid>
      <div className="table-header" style={{ display: 'flex', alignItems: 'center' }}>   
          <IconButton  
              color="primary"  
              onClick={addNewRow}  
              style={{ color: '#797d90', borderRadius: '50%', width: '15px', height: '15px' }}  
          >  
              <AddCircleIcon fontSize="large" />  
          </IconButton>  
          <h2 style={{ margin: 15 }}>Cuentas Ahorros-Corrientes</h2> 
      </div>
      <TableContainer component={Paper} className="transaction-table-container">
        <Table className="transaction-table" aria-label="transaction table">
        <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: 'center !important', fontSize: '0.75rem !important', backgroundColor: '#f2f2f2', padding: '10px' }} colSpan={9} align="center">Demandado</TableCell>
                <TableCell sx={{ textAlign: 'center !important', fontSize: '0.75rem !important', backgroundColor: '#2c304b !important', padding: '10px' }} colSpan={7} align="center">Beneficiario</TableCell>
                <TableCell sx={{ textAlign: 'center !important', fontSize: '0.75rem !important', backgroundColor: '#f2f2f2', padding: '10px' }} colSpan={3} align="center">Transaccion</TableCell> 
              </TableRow>
              <TableRow sx={{ fontSize: '0.75rem !important' }}>
                <TableCell>Nombres</TableCell>
                <TableCell>Apellidos</TableCell>
                <TableCell>Tipo identificación</TableCell>
                <TableCell>Identificación</TableCell>
                <TableCell>Oficio</TableCell>
                <TableCell>Monto</TableCell>
                <TableCell>Banco</TableCell>
                <TableCell>Tipo Cuenta</TableCell>
                <TableCell>Cuenta</TableCell>
                <TableCell sx={{ backgroundColor: '#2c304b !important' }}>Nombres</TableCell>
                <TableCell sx={{ backgroundColor: '#2c304b !important' }}>Apellidos</TableCell>
                <TableCell sx={{ backgroundColor: '#2c304b !important' }}>Tipo Cuenta</TableCell>
                <TableCell sx={{ backgroundColor: '#2c304b !important' }}>Cuenta</TableCell>
                <TableCell sx={{ backgroundColor: '#2c304b !important' }}>Tipo Identification</TableCell>
                <TableCell sx={{ backgroundColor: '#2c304b !important' }}>Identificacion</TableCell>
                <TableCell sx={{ backgroundColor: '#2c304b !important' }}>Banco</TableCell>
                <TableCell>Estado Transaccion</TableCell>
                <TableCell>Fecha Respuesta</TableCell>
                <TableCell>Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      fullWidth
                      id="nameDefendant"
                      name="nameDefendant"
                      value={row.nameDefendant || ''} 
                      onChange={(e) => handleTableInputChange(index, e)}
                      variant="outlined"
                      margin="dense"
                      InputProps={{
                        disableUnderline: true,
                        sx: {
                          '& fieldset': {
                            border: 'none',
                          },
                        },
                      }}
                      sx={{
                        '& .MuiInputBase-input': {
                          fontSize: '0.7rem',
                          padding: '8px',
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      id="lastnameDefendant"
                      name="lastnameDefendant"
                      value={row.lastnameDefendant || ''}
                      onChange={(e) => handleTableInputChange(index, e)}
                      variant="outlined"
                      margin="dense"
                      InputProps={{
                        disableUnderline: true,
                        sx: {
                          '& fieldset': {
                            border: 'none',
                          },
                        },
                      }}
                      sx={{
                        '& .MuiInputBase-input': {
                          fontSize: '0.7rem',
                          padding: '8px',
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      fullWidth
                      id="identificationTypeDefendant"
                      name="identificationTypeDefendant"
                      value={row.identificationTypeDefendant || ''}
                      onChange={(e) => handleTableInputChange(index, e)}
                      variant="outlined"
                      margin="dense"
                      sx={{
                        '& .MuiInputBase-input': {
                          fontSize: '0.7rem',
                          padding: '8px',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          border: 'none',
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          border: 'none',
                        },
                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                          border: 'none',
                        },
                      }}
                    >
                      <MenuItem value="">
                        <em>Seleccione...</em>
                      </MenuItem>
                      <MenuItem value="cedula">Cédula</MenuItem>
                      <MenuItem value="pasaporte">Pasaporte</MenuItem>
                      <MenuItem value="ruc">RUC</MenuItem>
                    </Select>
                  </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        id="identificationDefendant"
                        name="identificationDefendant"
                        value={row.identificationDefendant || ''}
                        onChange={(e) => handleTableInputChange(index, e)}
                        variant="outlined"
                        margin="dense"
                        InputProps={{
                          disableUnderline: true,
                          sx: {
                            '& fieldset': {
                              border: 'none',
                            },
                          },
                        }}
                        sx={{
                          '& .MuiInputBase-input': {
                            fontSize: '0.7rem',
                            padding: '8px',
                            minWidth: '70px',
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        id="numOffice"
                        name="numOffice"
                        value={row.numOffice || ''}
                        onChange={(e) => handleTableInputChange(index, e)}
                        variant="outlined"
                        margin="dense"
                        InputProps={{
                          disableUnderline: true,
                          sx: {
                            '& fieldset': {
                              border: 'none',
                            },
                          },
                        }}
                        sx={{
                          '& .MuiInputBase-input': {
                            fontSize: '0.7rem',
                            padding: '8px',
                            minWidth: '120px',
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        id="amount"
                        name="amount"
                        value={row.amount || ''}
                        onChange={(e) => handleTableInputChange(index, e)}
                        variant="outlined"
                        margin="dense"
                        InputProps={{
                          disableUnderline: true,
                          sx: {
                            '& fieldset': {
                              border: 'none',
                            },
                          },
                        }}
                        sx={{
                          '& .MuiInputBase-input': {
                            fontSize: '0.7rem',
                            padding: '8px',
                            minWidth: '40px',
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        fullWidth
                        id="bankDefendant"
                        name="bankDefendant"
                        value={row.bankDefendant || ''}
                        onChange={(e) => handleTableInputChange(index, e)}
                        variant="outlined"
                        margin="dense"
                        sx={{
                          '& .MuiInputBase-input': {
                            fontSize: '0.7rem',
                            padding: '8px',
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                          '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                        }}                    
                      >
                        <MenuItem value="">
                          <em>Seleccione...</em>
                        </MenuItem>
                        {bankOptions.map((bank, idx) => (
                          <MenuItem key={idx} value={bank}>
                            {bank}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        fullWidth
                        id="accountTypeDefendant"
                        name="accountTypeDefendant"
                        value={row.accountTypeDefendant}
                        onChange={(e) => handleTableInputChange(index, e)}
                        variant="outlined"
                        margin="dense"
                        sx={{
                          '& .MuiInputBase-input': {
                            fontSize: '0.7rem',
                            padding: '8px',
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                          '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                        }}                    
                      >
                        <MenuItem value="">
                          <em>Seleccione...</em>
                        </MenuItem>
                        <MenuItem value="ahorros">Ahorros</MenuItem>
                        <MenuItem value="corriente">Corriente</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        id="accountNumDefendant"
                        name="accountNumDefendant"
                        value={row.accountNumDefendant}
                        onChange={(e) => handleTableInputChange(index, e)}
                        variant="outlined"
                        margin="dense"
                        InputProps={{
                          disableUnderline: true,
                          sx: {
                            '& fieldset': {
                              border: 'none',
                            },
                          },
                        }}
                        sx={{
                          '& .MuiInputBase-input': {
                            fontSize: '0.7rem',
                            padding: '8px',
                            minWidth: '70px',
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                      fullWidth
                      id="nameBeneficiary"
                      name="nameBeneficiary"
                      value={row.nameBeneficiary}
                      onChange={(e) => handleTableInputChange(index, e)}
                      variant="outlined"
                      margin="dense"
                      InputProps={{
                        disableUnderline: true,
                        sx: {
                          '& fieldset': {
                            border: 'none',
                          },
                        },
                      }}
                      sx={{
                        '& .MuiInputBase-input': {
                          fontSize: '0.7rem',
                          padding: '8px',
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      id="lastnameBeneficiary"
                      name="lastnameBeneficiary"
                      value={row.lastnameBeneficiary}
                      onChange={(e) => handleTableInputChange(index, e)}
                      variant="outlined"
                      margin="dense"
                      InputProps={{
                        disableUnderline: true,
                        sx: {
                          '& fieldset': {
                            border: 'none',
                          },
                        },
                      }}
                      sx={{
                        '& .MuiInputBase-input': {
                          fontSize: '0.7rem',
                          padding: '8px',
                        },
                      }}
                    />
                  </TableCell>
                    <TableCell>
                      <Select
                        fullWidth
                        id="accountTypeBeneficiary"
                        name="accountTypeBeneficiary"
                        value={row.accountTypeBeneficiary}
                        onChange={(e) => handleTableInputChange(index, e)}
                        variant="outlined"
                        margin="dense"
                        sx={{
                          '& .MuiInputBase-input': {
                            fontSize: '0.7rem',
                            padding: '8px',
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                          '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                        }}                    
                      >
                        <MenuItem value="">
                          <em>Seleccione...</em>
                        </MenuItem>
                        <MenuItem value="ahorros">Ahorros</MenuItem>
                        <MenuItem value="corriente">Corriente</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        id="accountNumBeneficiary"
                        name="accountNumBeneficiary"
                        value={row.accountNumBeneficiary}
                        onChange={(e) => handleTableInputChange(index, e)}
                        variant="outlined"
                        margin="dense"
                        InputProps={{
                          disableUnderline: true,
                          sx: {
                            '& fieldset': {
                              border: 'none',
                            },
                          },
                        }}
                        sx={{
                          '& .MuiInputBase-input': {
                            fontSize: '0.7rem',
                            padding: '8px',
                            minWidth: '70px',
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                    <Select
                      fullWidth
                      id="identificationTypeBeneficiary"
                      name="identificationTypeBeneficiary"
                      value={row.identificationTypeBeneficiary}
                      onChange={(e) => handleTableInputChange(index, e)}
                      variant="outlined"
                      margin="dense"
                      sx={{
                        '& .MuiInputBase-input': {
                          fontSize: '0.7rem',
                          padding: '8px',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          border: 'none',
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          border: 'none',
                        },
                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                          border: 'none',
                        },
                      }}                  
                    >
                      <MenuItem value="">
                        <em>Seleccione...</em>
                      </MenuItem>
                      <MenuItem value="cedula">Cédula</MenuItem>
                      <MenuItem value="pasaporte">Pasaporte</MenuItem>
                      <MenuItem value="ruc">RUC</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      id="identificationBeneficiary"
                      name="identificationBeneficiary"
                      value={row.identificationBeneficiary}
                      onChange={(e) => handleTableInputChange(index, e)}
                      variant="outlined"
                      margin="dense"
                      InputProps={{
                        disableUnderline: true,
                        sx: {
                          '& fieldset': {
                            border: 'none',
                          },
                        },
                      }}
                      sx={{
                        '& .MuiInputBase-input': {
                          fontSize: '0.7rem',
                          padding: '8px',
                          minWidth: '70px',
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                  {console.log('BENEFICIARIO:', row.accountTypeBeneficiary)}
                    <Select
                      fullWidth
                      id="bankBeneficiary"
                      name="bankBeneficiary"
                      value={row.bankBeneficiary || ''}
                      onChange={(e) => handleTableInputChange(index, e)}
                      variant="outlined"
                      margin="dense"
                      sx={{
                        '& .MuiInputBase-input': {
                          fontSize: '0.7rem',
                          padding: '8px',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          border: 'none',
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          border: 'none',
                        },
                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                          border: 'none',
                        },
                      }}                  
                    >
                      <MenuItem value="">
                        <em>Seleccione...</em>
                      </MenuItem>
                      {bankOptions.map((bank, idx) => (
                        <MenuItem key={idx} value={bank}>
                          {bank}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      id="transactionStatus"
                      name="transactionStatus"
                      value={row.transactionStatus}
                      onChange={(e) => handleTableInputChange(index, e)}
                      variant="outlined"
                      margin="dense"
                      InputProps={{
                        disableUnderline: true,
                        readOnly: true,
                        sx: {
                          '.MuiInputBase-input': {
                            fontSize: '0.75rem',
                            backgroundColor: '#193b3a',
                            color: 'white',
                            borderRadius: '4px',
                            padding: '8px',
                          },
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      id="responseDate"
                      name="responseDate"
                      value={row.responseDate}
                      onChange={(e) => handleTableInputChange(index, e)}
                      variant="outlined"
                      margin="dense"
                      InputProps={{
                        disableUnderline: true,
                        readOnly: true,
                        sx: {
                          '.MuiInputBase-input': {
                            fontSize: '0.75rem',
                            backgroundColor: '#193b3a',
                            color: 'white',
                            borderRadius: '4px',
                            padding: '8px',
                          },
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                      <IconButton color="secondary" onClick={() => deleteRow(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
        </Table>
      </TableContainer>
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

export default EditSeizureOrderComponent;