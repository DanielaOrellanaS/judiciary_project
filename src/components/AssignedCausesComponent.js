import React from 'react';
import BankIcon from '@mui/icons-material/AccountBalance';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

const containerStyles = {
  width: '300px',
  textAlign: 'left',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  borderRadius: '0',
  marginLeft: '10px', 
  marginTop: '10px',
};

const textStyles = {
  backgroundColor: '#fff',
  padding: '10px',
  lineHeight: '1.5',
  textAlign: 'center',
  fontSize: '14px',
};

const boldTextStyles = {
  ...textStyles,
  fontWeight: 'bolder',
};

const iconStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const AssignedCausesComponent = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div style={{ ...containerStyles, marginBottom: '20px' }}>
        <div style={boldTextStyles}>
          UNIDAD JUDICIAL CIVIL CON SEDE EN LA PARROQUIA CARCELEN DEL DISTRITO METROPOLITANO DE QUITO, PROVINCIA DE PICHINCHA
        </div>
        <div style={{ ...textStyles, paddingBottom: '18px' }}>
          SECRETARIO
        </div>
        <div style={boldTextStyles}>
          <Link to="/transaccion">Transacción</Link>
        </div>
        <div style={{ backgroundColor: '#e0d3cb', padding: '10px', lineHeight: '1.5', borderRadius: '0', ...iconStyles }}>
          <BankIcon />
          <div>18824</div>
          <ExpandMoreIcon />
        </div>
      </div>
      <div style={containerStyles}>
        <div style={boldTextStyles}>
          UNIDAD JUDICIAL CIVIL CON SEDE EN LA PARROQUIA CARCELEN DEL DISTRITO METROPOLITANO DE QUITO, PROVINCIA DE PICHINCHA
        </div>
        <div style={{ ...textStyles, paddingBottom: '18px' }}>
          SECRETARIO
        </div>
        <div style={boldTextStyles}>
          <Link to="/transaccion">Transacción</Link>
        </div>
        <div style={{ backgroundColor: '#e0d3cb', padding: '10px', lineHeight: '1.5', borderRadius: '0', ...iconStyles }}>
          <BankIcon />
          <div>18825</div>
          <ExpandMoreIcon />
        </div>
      </div>
    </div>
  );
};

export default AssignedCausesComponent;
