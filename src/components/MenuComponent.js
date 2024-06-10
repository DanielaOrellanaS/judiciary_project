import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import GridViewIcon from '@mui/icons-material/GridView';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { styled } from '@mui/system';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MenuContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  backgroundColor: 'white',
});

const MenuItem = styled(Paper)({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  cursor: 'pointer',
  width: '100%',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  marginBottom: '10px',
  '&:hover': {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  },
});

const MenuTitle = styled('div')({
  backgroundColor: '#191e3b',
  color: '#fff',
  fontSize: '14px',
  padding: '10px',
  textAlign: 'left',
  fontWeight: 'bold',
});

const SubMenuItemLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
});

const SubMenuItems = ['Causas asignadas', 'Búsqueda de proceso', 'Citaciones'];

const MenuComponent = () => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const handleSubMenuToggle = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <MenuContainer>
      <img src="./logo_judiciary.png" alt="Imagen" style={{ width: '100%', marginBottom: '10px' }} /> 
      <MenuTitle>TRÁMITE WEB</MenuTitle>
      <MenuItem elevation={2}>
        <HomeIcon />
        <span style={{ marginLeft: '10px' }}>INICIO</span>
      </MenuItem>
      <MenuItem elevation={2} onClick={handleSubMenuToggle}>
        <BusinessCenterIcon sx={{ marginRight: '10px' }} />
        <span>Gestión de despacho</span>
        <IconButton sx={{ marginLeft: 'auto' }}>
          <ExpandMoreIcon sx={{ marginRight: '20px' }} />
        </IconButton>
      </MenuItem>
      {subMenuOpen && (
        <>
          {SubMenuItems.map((item, index) => (
            <MenuItem key={index} elevation={2} style={{ paddingLeft: '30px' }}>
              <SubMenuItemLink to={`/${item.toLowerCase().replace(/\s/g, '-')}`}>{item}</SubMenuItemLink>
            </MenuItem>
          ))}
        </>
      )}
      <MenuItem elevation={2}>
        <GridViewIcon />
        <span style={{ marginLeft: '10px' }}>Reportes Generales</span>
        <IconButton sx={{ marginLeft: 'auto' }}>
          <ExpandMoreIcon sx={{ marginRight: '20px' }} />
        </IconButton>
      </MenuItem>
      <MenuItem elevation={2}>
        <GridViewIcon />
        <span style={{ marginLeft: '10px' }}>Reportes OGJE</span>
        <IconButton sx={{ marginLeft: 'auto' }}>
          <ExpandMoreIcon sx={{ marginRight: '20px' }} />
        </IconButton>
      </MenuItem>
      <MenuItem elevation={2}>
        <AccessTimeIcon />
        <span style={{ marginLeft: '10px' }}>AGENDA</span>
        <IconButton sx={{ marginLeft: 'auto' }}>
          <ExpandMoreIcon sx={{ marginRight: '20px' }} />
        </IconButton>
      </MenuItem>
      <img src="./footer_menu.png" alt="Footer" style={{ width: '100%', marginTop: 'auto' }} />
    </MenuContainer>
  );
};

export default MenuComponent;
