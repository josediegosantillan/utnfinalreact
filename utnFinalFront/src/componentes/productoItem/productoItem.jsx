
import React from 'react';
import {
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Divider,
  Avatar,
  useTheme // Usamos useTheme para acceder a los colores de la paleta
} from '@mui/material';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

function ProductoItem({ product, onMasMenos, onOpenDetails, cantidadEnCarrito }) {
  const theme = useTheme();
  const { id, nombre, precio, imagen, descripcion, tipo } = product;

  const formatoNumero = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return (
    <>
    {/* lista que manja los items de la lista de productos */}
      <ListItem
        sx={{
          py: 1.5, // Padding vertical
          px: 2,   // Padding horizontal
          display: 'flex',
          alignItems: 'center',
          //ASI MANEJA EL HOVER MUI :)
          '&:hover': {
            backgroundColor: 'action.hover',
            cursor: 'pointer',
          },
        }}
        onClick={() => onOpenDetails(product)}
      >
        <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
          {imagen && typeof imagen === 'string' && ( 
            <Avatar src={imagen} alt={nombre} sx={{ width: 48, height: 48 }} />
          )}
        </Box>
        {/* --- TEXTO DEL PRODUCTO (Nombre y Precio) --- */}
        <ListItemText
          primary={
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              {nombre}
            </Typography>
          }
          secondary={
            <Typography variant="body2" color="text.secondary">
              {formatoNumero.format(precio)}
            </Typography>
          }
          sx={{ flexGrow: 1, mr: 2 }}
        />
        {/* --- BOTONES DE CANTIDAD (+/-) Y CONTADOR --- */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {cantidadEnCarrito > 0 && (
            <IconButton
              aria-label="restar"
              size="small"
              onClick={(e) => { e.stopPropagation(); onMasMenos(product, '-'); }}
              color="secondary"
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
          )}
          {cantidadEnCarrito > 0 && (
            <Typography variant="body1" sx={{ fontWeight: 'bold', minWidth: '24px', textAlign: 'center' }}>
              {cantidadEnCarrito}
            </Typography>
          )}
          <IconButton
            aria-label="agregar"
            size="small"
            onClick={(e) => { e.stopPropagation(); onMasMenos(product, '+'); }}
            color="primary"
          >
            <AddCircleOutlineIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </Box>
      </ListItem>
      <Divider component="li" /> {/* Línea divisoria entre ítems */}
    </>
  );
}
export default ProductoItem;
