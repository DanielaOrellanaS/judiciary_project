import React from 'react';
import { Link } from 'react-router-dom';
import '../components.css';

const MenuTransactionComponent = () => {
  const options = [
    { label: 'Requerir Datos Cuenta', path: '/requerir-datos-cuenta' },
    { label: 'Orden Retención', path: '/orden-retencion' },
    { label: 'Orden de Liberación', path: '/orden-liberacion' },
    { label: 'Orden de Embargo', path: '/orden-embargo' },
  ];

  return (
    <div className="menu-transaction-container">
      {options.map((option, index) => (
        <Link key={index} to={option.path} className="menu-option">
          {option.label}
        </Link>
      ))}
    </div>
  );
};

export default MenuTransactionComponent;
