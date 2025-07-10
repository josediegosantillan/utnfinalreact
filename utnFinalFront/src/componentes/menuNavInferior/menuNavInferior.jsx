import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalCafeRoundedIcon from '@mui/icons-material/LocalCafeRounded';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SearchIcon from '@mui/icons-material/Search'; // <-- ¡NUEVO IMPORT!
import Box from '@mui/material/Box';

const indiceNav = ['/cafes', '/pasteleria', '/vegano', '/pedido', '/buscar']; 
function MenuNavInferior() {
  const navegar = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);

  useEffect(() => {
    const indiceActual = indiceNav.indexOf(location.pathname);
    if (indiceActual !== -1) {
      setValue(indiceActual);
    } else {
      setValue(0);
    }
  }, [location.pathname]);

  return (
    <Box
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          if (indiceNav[newValue]) {
            navegar(indiceNav[newValue]);
          } else {
            navegar('/cafes');
          }
        }}
        sx={{
          '.Mui-selected': {
            color: 'primary.main',
            fontWeight: 'bold',
          },
          '.MuiBottomNavigationAction-label': {
            fontSize: '1rem',
          },
          '.MuiBottomNavigationAction-root': {
            fontSize: '1.2rem',
          },
          '.MuiSvgIcon-root': {
            fontSize: '1.6rem',
          },
        }}
      >
        <BottomNavigationAction label="Cafes" icon={<LocalCafeRoundedIcon />} />
        <BottomNavigationAction label="Pasteleria" icon={<BakeryDiningIcon />} />
        <BottomNavigationAction label="Vegano" icon={<RestaurantIcon />} />
        <BottomNavigationAction label="Ver Pedido" icon={<ShoppingCartIcon />} />
        <BottomNavigationAction label="Buscar" icon={<SearchIcon />} /> {/* <-- ¡NUEVA ACCIÓN! */}
      </BottomNavigation>
    </Box>
  );
}
export default MenuNavInferior;

