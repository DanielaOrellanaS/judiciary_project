import React, { useState } from 'react';
import '../components.css';
import { getJudgment, saveJudgment, saveOrdersSeizure } from '../Api';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import bankOptions from '../bankOptions';
import { FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

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
  
  const [seizure, setSeizure] = useState(''); 

  const handleSeizureChange = (e) => {
    setSeizure(e.target.value);
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
          accountTypeBeneficiary: item.accountTypeBeneficiary || '',
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
              label="Auto de Embargo"
              id="seizure"
              name="seizure"
              value={seizure}
              onChange={handleSeizureChange}
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
              <TableCell></TableCell> 
            </TableRow>
              <TableRow sx={{ fontSize: '0.75rem !important' }}>
                <TableCell>Nombres</TableCell>
                <TableCell>Apellidos</TableCell>
                <TableCell>Tipo identificación</TableCell>
                <TableCell>Identificación</TableCell>
                <TableCell>Num Oficio</TableCell>
                <TableCell>Monto</TableCell>
                <TableCell>Banco</TableCell>
                <TableCell>Tipo Cuenta</TableCell>
                <TableCell>Num Cuenta</TableCell>
                <TableCell sx={{ backgroundColor: '#2c304b !important' }}>Nombres</TableCell>
                <TableCell sx={{ backgroundColor: '#2c304b !important' }}>Apellidos</TableCell>
                <TableCell sx={{ backgroundColor: '#2c304b !important' }}>Tipo Cuenta</TableCell>
                <TableCell sx={{ backgroundColor: '#2c304b !important' }}>Num Cuenta</TableCell>
                <TableCell sx={{ backgroundColor: '#2c304b !important' }}>Tipo Identification</TableCell>
                <TableCell sx={{ backgroundColor: '#2c304b !important' }}>Identificacion</TableCell>
                <TableCell sx={{ backgroundColor: '#2c304b !important' }}>Banco</TableCell>
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
                      value={row.nameDefendant}
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
                          minWidth: '100px',
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      id="lastnameDefendant"
                      name="lastnameDefendant"
                      value={row.lastnameDefendant}
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
                          minWidth: '100px',
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      fullWidth
                      id="identificationTypeDefendant"
                      name="identificationTypeDefendant"
                      value={row.identificationTypeDefendant}
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
                      value={row.identificationDefendant}
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
                      value={row.numOffice}
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
                      value={row.amount}
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
                        minWidth: '100px',
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
                        minWidth: '100px',
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

export default SeizureOrderComponent;
