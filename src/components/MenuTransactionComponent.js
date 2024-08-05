import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../components.css';

const   MenuTransactionComponent = () => {
  const location = useLocation();
  const { numJudgment } = location.state || {};

  console.log("JUICIO: ", numJudgment)

  const options = [
    { label: 'Requerir Datos Cuenta', path: '/table-require-data', title: 'Requerir Datos Cuenta' },
    { label: 'Orden Retención', path: '/table-retention-order', title: 'Orden Retención' },
    { label: 'Orden de Liberación', path: '/table-release-order', title: 'Orden de Liberación' },
    { label: 'Orden de Embargo', path: '/table-seizure-order', title: 'Orden de Embargo' },
  ];

  return (
    <div className="menu-transaction-container">
      {options.map((option, index) => (
        <Link
          key={index}
          to={option.path}
          state={{ numJudgment, title: option.title }}
          className="menu-option"
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
};

export default MenuTransactionComponent;
