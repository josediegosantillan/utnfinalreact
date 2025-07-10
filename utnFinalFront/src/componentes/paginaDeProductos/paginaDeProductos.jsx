import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useTraerDatos from '../traerDatos/TraerDatos';
import useCarrito from '../carrito/carrito';
import ListaProductos from '../listaProductos/listaDeProductos';
import ContenidoCarrito from '../contenidoCarrito/contenidoCarrito';
import ProductoCard from '../ProductoCard/ProductoCard';
import ConfirmacionPedidoCard from '../ConfirmacionPedidoCard/ConfirmacionPedidoCard';

import {
  CircularProgress,
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  Dialog,
  DialogContent,
  Alert,
  Button
} from '@mui/material';

const sheetId = '1PNKIsMzBQTftNvT05Tk6ZvtQYEL0itSiIL_jEMtS3BY';
const apiKey = 'AIzaSyDhJas-c3-hr0TdD-D3L3KdWcr50spU-Ww';

function PaginaDeProductos({ categoria, hoja }) {
  const categoriaUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${hoja}!A3:Z?key=${apiKey}`;
  const { productos, loading, error } = useTraerDatos({ url: categoriaUrl });
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const { cartItems, agregarCarrito, restarCarrito, quitarCarrito, calcularTotal, realizarPedido } = useCarrito();
  const [productoSeleccionadoParaDetalles, setProductoSeleccionadoParaDetalles] = useState(null);
  const [mostrarConfirmacionPedido, setMostrarConfirmacionPedido] = useState(false);
  const [ultimoPedidoRealizado, setUltimoPedidoRealizado] = useState(null);

  // Estado para controlar la carga del pedido
  const [procesandoPedido, setProcesandoPedido] = useState(false);

  useEffect(() => {
    if (!loading && !error && productos.length > 0) {
      setProductosDisponibles(productos);
    }
  }, [productos, loading, error]);

  const handleMasMenos = (producto, accion) => {
    if (accion === '+') {
      agregarCarrito(producto, 1);
    } else if (accion === '-') {
      const itemEnCarrito = cartItems.find(item => item.id === producto.id);
      if (itemEnCarrito && itemEnCarrito.cantidad > 1) {
        restarCarrito(producto, 1);
      } else if (itemEnCarrito && itemEnCarrito.cantidad === 1) {
        quitarCarrito(producto.id);
      }
    }
  };

  const handleOpenDetails = (producto) => { setProductoSeleccionadoParaDetalles(producto); };
  const handleCloseDetails = () => { setProductoSeleccionadoParaDetalles(null); };

  const handleRealizarPedido = async () => {
    setProcesandoPedido(true); // Activa el estado de "procesando"

    // Simulacion de una operación asíncrona 
    await new Promise(resolve => setTimeout(resolve, 3500)); 
    const pedido = realizarPedido(); // Realiza el pedido
  
    setProcesandoPedido(false); // Desactiva el estado de "procesando"
    if (pedido) {
      setUltimoPedidoRealizado(pedido);
      setMostrarConfirmacionPedido(true); // Muestra la confirmación del pedido
    }
  };

  const handleCloseConfirmacionPedido = () => {
    setMostrarConfirmacionPedido(false);
    setUltimoPedidoRealizado(null);
  };

  const formatoNumero = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size={60} sx={{ mb: 2 }} />
        <Typography variant="h6" color="text.secondary">Cargando productos...</Typography>
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', p: 3 }}>
        <Alert severity="error" sx={{ width: '100%', maxWidth: 400 }}>
          No pudimos cargar los productos. Por favor, intentá de nuevo más tarde. {error.message}
        </Alert>
      </Box>
    );
  }
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
          Menú
        </Typography>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 600,
            color: 'primary.main',
          }}
        >
          {categoria}
        </Typography>
      </Box>
      <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
        <Grid item xs={12} md={8}>
          <ListaProductos
            products={productosDisponibles}
            loading={loading}
            error={error}
            onMasMenos={handleMasMenos}
            onOpenDetails={handleOpenDetails}
            cartItems={cartItems}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{
            position: 'sticky',
            top: '20px',
            alignSelf: 'flex-start',
            height: 'fit-content',
            width: '100%',
          }}>
            <ContenidoCarrito
              items={cartItems}
              onRemoveItem={quitarCarrito}
            />
            {cartItems.length > 0 && (
              <Paper elevation={4} sx={{
                p: 2,
                mt: 2,
                textAlign: 'center',
                borderRadius: 2,
                bgcolor: 'primary.light',
              }}>
                <Typography variant="h5" sx={{
                  fontWeight: 'bold',
                  color: 'primary.contrastText',
                }}>
                  Total a pagar: {formatoNumero.format(calcularTotal())}
                </Typography>
              </Paper>
            )}

            {cartItems.length > 0 && (
              // --- El botón "Hacer el pedido" ahora es siempre un botón normal aquí ---
              <Button
                variant="contained"
                size="large"
                fullWidth
                elevation={8}
                sx={{
                  mt: 1,
                  fontWeight: 'bold',
                  backgroundColor: '#257247',
                  '&:hover': {
                    backgroundColor: '#1c5f39',
                  },
                }}
                onClick={handleRealizarPedido}
                disabled={procesandoPedido} // Deshabilita el botón mientras se procesa
              >
                Hacer el pedido
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Dialogo/Modal para los detalles del producto */}
      <Dialog
        open={!!productoSeleccionadoParaDetalles}
        onClose={handleCloseDetails}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 3,
            overflow: 'hidden',
          },
        }}
      >
        <DialogContent sx={{ position: 'relative', p: 0 }}>
          {productoSeleccionadoParaDetalles && (
            <ProductoCard
              producto={productoSeleccionadoParaDetalles}
              onCloseDetails={handleCloseDetails}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Dialogo/Modal para la confirmación del pedido */}
      <Dialog
        open={mostrarConfirmacionPedido}
        onClose={handleCloseConfirmacionPedido}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 3,
            overflow: 'hidden',
          },
        }}
      >
        <DialogContent sx={{ position: 'relative', p: 0 }}>
          {ultimoPedidoRealizado && (
            <ConfirmacionPedidoCard
              pedido={ultimoPedidoRealizado}
              onClose={handleCloseConfirmacionPedido}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* procesando el simulador */}
      {procesandoPedido && (
        <Box
          sx={{
            position: 'fixed', // Posicionamiento fijo respecto al viewport
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente oscuro
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', // Centrado vertical
            alignItems: 'center',   // Centrado horizontal
            zIndex: 9999,           // Asegura que esté por encima de todo
            backdropFilter: 'blur(3px)', // Efecto de desenfoque, si lo soporta el navegador
          }}
        >
          <Paper elevation={12} sx={{
            p: 4, // Más padding para que el contenido respire
            textAlign: 'center',
            borderRadius: 3, // Un poco más redondeado
            bgcolor: 'background.paper', // Color de fondo del tema
            color: 'text.primary',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '200px', // Ancho mínimo para que no se vea apretado
            maxWidth: '300px', // Ancho máximo
          }}>
            <CircularProgress size={40} sx={{ color: 'primary.main', mb: 2 }} /> 
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Procesando pedido...
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Por favor, esperá un momento.
            </Typography>
          </Paper>
        </Box>
      )}
    </Container>
  );
}
export default PaginaDeProductos;
