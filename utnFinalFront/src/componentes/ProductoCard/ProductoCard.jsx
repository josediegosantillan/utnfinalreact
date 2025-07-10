
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Divider,
  Box,
  IconButton // Importamos IconButton
} from '@mui/material';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CloseIcon from '@mui/icons-material/Close'; // Importamos el icono de cerrar
// Recibe la prop onCloseDetails desde MenuPrincipal
function ProductoCard({ producto, onCloseDetails }) {
  if (!producto) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        width: 300,
        backgroundColor: '#f5f5f5',
        borderRadius: 2,
        boxShadow: 1
      }}>
        <Typography variant="subtitle1" color="text.secondary">
          Error: Producto no encontrado.
        </Typography>
      </Box>
    );
  }
  return (
    <Card
      sx={{
        maxWidth: 380,
        width: '100%',
        borderRadius: 3, 
        boxShadow: 6,
        position: 'relative', // IMPORTANTE: Para que la posición absoluta del botón funcione
      }}
    >
      {/* Botón de cerrar, ahora DENTRO de la Card */}
      <IconButton
        aria-label="close"
        onClick={onCloseDetails} // Usamos la prop que recibimos
        sx={{
          position: 'absolute', // Posicionamiento absoluto respecto a la Card
          right: 8, // A 8px del borde derecho
          top: 8,   // A 8px del borde superior
          color: (theme) => theme.palette.grey[600], // Un gris oscuro para que resalte
          backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fondo semitransparente blanco
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Más opaco al pasar el mouse
            color: (theme) => theme.palette.grey[900],
          },
          zIndex: 2, // Asegura que esté por encima de la imagen y contenido
          borderRadius: '50%', // Botón redondo
          p: 0.5 // Padding interno del IconButton
        }}
      >
        <CloseIcon />
      </IconButton>

      <CardMedia
        component="img"
        sx={{
          height: 220,
          objectFit: 'cover',
          //el borderRadius de la Card principal lo va a manejar
        }}
        image={producto.imagen ||'/cafe1.png'}
        alt={producto.nombre}
      />
      <CardContent sx={{ padding: 3 }}>
        <Typography gutterBottom variant="h5" component="div"
          sx={{
            fontWeight: 'bold',
            color: 'primary.dark',
            mb: 1.5
          }}
        >
          {producto.nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary"
          sx={{
            minHeight: 40,
            fontSize: '0.9rem',
            lineHeight: 1.5,
            mb: 1
          }}
        >
          {producto.descripcion || "Un delicioso café para empezar el día."}
        </Typography>

        {producto.infoExtra && (
          <Typography variant="body2" color="text.primary" sx={{ mt: 2, fontSize: '0.85rem' }}>
            Infoextra: {producto.infoExtra}
          </Typography>
        )}

        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" color="secondary.main"
            sx={{
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            Precio: ${producto.precio.toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
export default ProductoCard;