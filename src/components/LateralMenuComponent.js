import React from 'react';
import MenuComponent from './MenuComponent';

const LateralMenuComponent = () => {
  return (
    <div style={{ display: 'flex', height: '100%', width: '100%' }}>
      <div style={{ flexBasis: '20%', backgroundColor: '#f0f0f0' }}>
        <MenuComponent />
      </div>
      <div style={{ flexBasis: '80%', backgroundColor: '#fff' }}>
        <img src="./background.png" alt="Imagen" style={{ width: '100%', height: '100%',  marginTop: '5px'  }} />
      </div>
    </div>
  );
};

export default LateralMenuComponent;
