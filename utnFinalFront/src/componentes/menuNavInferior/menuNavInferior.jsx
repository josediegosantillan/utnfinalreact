import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalCafeRoundedIcon from '@mui/icons-material/LocalCafeRounded';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SearchIcon from '@mui/icons-material/Search';
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
      navegar('/cafes');
    }
  }, [location.pathname, navegar]);

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
          navegar(indiceNav[newValue] || '/cafes');
        }}
        sx={{
          '.Mui-selected': {
            color: 'primary.main',
            fontWeight: 'bold',
          },
          '.MuiBottomNavigationAction-label': {
            fontSize: '0.8rem', // Estilo base para pantallas muy chicas
            // 'sm' (600px) y más grandes
            '@media (min-width:600px)': {
              fontSize: '1rem',
            },
            // Media query para pantallas 'md' (900px) y más grandes
            '@media (min-width:900px)': {
              fontSize: '1.1rem',
            },
          },
          '.MuiSvgIcon-root': {
            fontSize: '1.4rem', // Estilo base para pantallas muy chicas
            // Media query para pantallas 'sm' (600px) y más grandes
            '@media (min-width:600px)': {
              fontSize: '1.6rem',
            },
            // Media query para pantallas 'md' (900px) y más grandes
            '@media (min-width:900px)': {
              fontSize: '1.8rem',
            },
          },
          '.MuiBottomNavigationAction-root': {
            minWidth: 'auto',
            padding: '6px 4px', // Padding base más compacto
            // Media query para pantallas 'sm' (600px) y más grandes
            '@media (min-width:600px)': {
              padding: '6px 8px',
            },
            // Media query para pantallas 'md' (900px) y más grandes
            '@media (min-width:900px)': {
              padding: '8px 12px',
            },
          },
        }}
      >
        <BottomNavigationAction label="Cafes" icon={<LocalCafeRoundedIcon />} />
        <BottomNavigationAction label="Pasteleria" icon={<BakeryDiningIcon />} />
        <BottomNavigationAction label="Vegano" icon={<RestaurantIcon />} />
        <BottomNavigationAction label="Ver Pedido" icon={<ShoppingCartIcon />} />
        <BottomNavigationAction label="Buscar" icon={<SearchIcon />} />
      </BottomNavigation>
    </Box>
  );
}
export default MenuNavInferior;