import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useCarrito from '../carrito/carrito';
function HistorialPedidos() {
  const { pedidosRealizados } = useCarrito();
  const formatoNumero = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <Paper elevation={4} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4, borderRadius: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Tus Compras Anteriores
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />
      {pedidosRealizados.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
          Aún no tenés pedidos en tu historial. ¡Hacé tu primera compra!
        </Typography>
      ) : (
        <Box>
          {pedidosRealizados.slice().reverse().map((pedido) => (
            <Accordion key={pedido.id} sx={{ mb: 2, boxShadow: 1, '&:before': { display: 'none' } }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${pedido.id}-content`}
                id={`panel-${pedido.id}-header`}
                sx={{
                  bgcolor: 'action.hover',
                  borderRadius: 1,
                  '& .MuiAccordionSummary-content': {
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  },
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Pedido ID: {pedido.id}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" sx={{ ml: 2 }}>
                  {pedido.fecha}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.dark', ml: 'auto' }}>
                  Total: {formatoNumero.format(pedido.total)}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1 }}>
                  Detalle del pedido:
                </Typography>
                <List dense>
                  {pedido.items.map((item, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemText
                        primary={`${item.nombre} x ${item.cantidad}`}
                        secondary={formatoNumero.format(item.precio * item.cantidad)}
                        sx={{
                          '& .MuiListItemText-primary': {
                            fontSize: '0.9rem',
                          },
                          '& .MuiListItemText-secondary': {
                            fontSize: '0.8rem',
                          },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}
    </Paper>
  );
}

export default HistorialPedidos;
