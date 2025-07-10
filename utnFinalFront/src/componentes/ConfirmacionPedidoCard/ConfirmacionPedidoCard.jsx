import {
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function ConfirmacionPedidoCard({ pedido, onClose }) {
  // Aseguramos que pedido y pedido.items existan antes de usarlos
  if (!pedido || !pedido.items || pedido.items.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="subtitle1" color="text.secondary">
          No hay un pedido válido para mostrar.
        </Typography>
      </Box>
    );
  }

  const formatoNumero = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <Card
      sx={{
        maxWidth: 450,
        width: '100%',
        borderRadius: 3,
        boxShadow: 8, 
        position: 'relative',
      }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[600],
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 1)',
            color: (theme) => theme.palette.grey[900],
          },
          zIndex: 2,
          borderRadius: '50%',
          p: 0.5,
        }}
      >
        <CloseIcon />
      </IconButton>

      <CardContent sx={{ padding: 3 }}>
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          sx={{ fontWeight: 'bold', color: 'success.main', mb: 2 }} 
        >
          ¡Pedido Realizado!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Tu pedido ha sido procesado con éxito. Aquí tienes el detalle:
        </Typography>

        <Divider sx={{ my: 2 }} />

        <List dense>
          {pedido.items.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemText
                primary={`${item.nombre} x ${item.cantidad}`}
                secondary={formatoNumero.format(item.precio * item.cantidad)}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontWeight: 'medium',
                  },
                }}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Typography
            variant="h5"
            color="primary.main"
            sx={{ fontWeight: 'bold' }}
          >
            Total Final:
          </Typography>
          <Typography
            variant="h5"
            color="primary.main"
            sx={{ fontWeight: 'bold' }}
          >
            {formatoNumero.format(pedido.total)}
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={onClose}
        >
          Cerrar
        </Button>
      </CardContent>
    </Card>
  );
}

export default ConfirmacionPedidoCard;