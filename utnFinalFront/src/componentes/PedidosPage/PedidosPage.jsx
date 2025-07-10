// src/pages/PedidosPage.jsx
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import HistorialPedidos from '../historialPedidos/HistorialPedidos'; // Ajusta la ruta si es necesario

function PedidosPage() {
  
  return (
    <Container maxWidth="lg" sx={{ pt: 4, pb: 10 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 4,
          mt: 2,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            mb: 1,
          }}
        >
          Mis Pedidos
        </Typography>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 600,
            color: 'primary.main',
          }}
        >
          Historial de Compras
        </Typography>
      </Box>
      {/* El componente HistorialPedidos se renderiza directamente aquí */}
      <HistorialPedidos />
    </Container>
  );
}

export default PedidosPage;