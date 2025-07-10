import { Box, Typography, List, ListItem, ListItemText, IconButton, Paper } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
const ContenidoCarrito = ({ items, onRemoveItem }) => {
  return (
    // Envolvemos el carrito en Paper para darle un fondo y elevación
    <Paper elevation={2} sx={{ p: 2, mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Productos Seleccionados
      </Typography>
      {items.length === 0 ? (
        <Typography color="text.secondary">Aún no hay productos seleccionados.</Typography>
      ) : (
        <List>
          {items.map((item) => (
            <ListItem
              key={item.id}
              // secondaryAction pone un elemento al final de la fila
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => onRemoveItem(item.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={item.nombre}
                secondary={`Cantidad: ${item.cantidad} - Subtotal: $${(item.precio * item.cantidad).toFixed(2)}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};
export default ContenidoCarrito;