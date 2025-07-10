import React from 'react';
import { List, Box, Typography } from '@mui/material';
import ProductoItem from '../productoItem/productoItem'; // Asegurate que esta ruta sea correcta

function ListaProductos({ products, onMasMenos, onOpenDetails, cartItems }) {
  if (!products || products.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="text.primary" gutterBottom>
          No hay productos disponibles en esta categoría.
        </Typography>
      </Box>
    );
  }
  return (
    <Box>
      <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden', boxShadow: 3 }}>
        {products.map((product) => (
          <ProductoItem
            key={product.id}
            product={product}
            onMasMenos={onMasMenos}
            onOpenDetails={onOpenDetails}
            cantidadEnCarrito={cartItems.find(item => item.id === product.id)?.cantidad || 0}
          />
        ))}
      </List>
    </Box>
  );
}
export default ListaProductos;
