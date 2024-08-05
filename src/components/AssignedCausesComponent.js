import React from 'react';
import BankIcon from '@mui/icons-material/AccountBalance';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

const containerStyles = {
  width: '280px',
  textAlign: 'left',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  borderRadius: '0',
  margin: '10px 5px',
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
  const causes = [
    { number: '18824', path: '/transaccion' },
    { number: '18825', path: '/transaccion' },
    { number: '18826', path: '/transaccion' },
    { number: '18827', path: '/transaccion' },
  ];

  return (
    <Grid container spacing={2} style={{ padding: '10px' }}>
      {causes.map((cause) => (
        <Grid item xs={12} sm={6} key={cause.number}>
          <div style={containerStyles}>
            <div style={boldTextStyles}>
              UNIDAD JUDICIAL CIVIL CON SEDE EN LA PARROQUIA CARCELEN DEL DISTRITO METROPOLITANO DE QUITO, PROVINCIA DE PICHINCHA
            </div>
            <div style={{ ...textStyles, paddingBottom: '18px' }}>
              SECRETARIO
            </div>
            <div style={boldTextStyles}>
              <Link 
                to={cause.path}
                state={{ numJudgment: cause.number }} 
              >
                Transacción Bancos
              </Link>
            </div>
            <div style={{ backgroundColor: '#e0d3cb', padding: '10px', lineHeight: '1.5', borderRadius: '0', ...iconStyles }}>
              <BankIcon />
              <div>{cause.number}</div>
              <ExpandMoreIcon />
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default AssignedCausesComponent;
