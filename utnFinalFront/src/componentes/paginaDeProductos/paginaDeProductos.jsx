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
    setProcesandoPedido(true);
    // simulacion de una operación asíncrona
    await new Promise(resolve => setTimeout(resolve, 3500));
    const pedido = realizarPedido();
    setProcesandoPedido(false);
    if (pedido) {
      setUltimoPedidoRealizado(pedido);
      setMostrarConfirmacionPedido(true);
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
    <Container maxWidth="lg" sx={{ pt: { xs: 2, sm: 4 }, pb: 10 }}> {/* Ajuste de padding top responsivo */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: { xs: 2, md: 4 }, 
          mt: { xs: 2, sm: 2 }, 
          textAlign: 'center', 
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            mb: 1,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '2.5rem' }, 
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
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2rem' }, // Tamaño de fuente responsivo
          }}
        >
          {categoria}
        </Typography>
      </Box>
      <Grid container spacing={{ xs: 2, md: 4 }} sx={{ justifyContent: 'center' }}> 
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
            top: { xs: '10px', sm: '20px' }, 
            alignSelf: 'flex-start',
            height: 'fit-content',
            width: '100%',
            px: { xs: 0, md: 0 },
          }}>
            <ContenidoCarrito
              items={cartItems}
              onRemoveItem={quitarCarrito}
            />
            {/* muestra el total a pagar */}
            {cartItems.length > 0 && (
              <Paper elevation={4} sx={{
                p: { xs: 1.5, sm: 2 },
                textAlign: 'center',
                borderRadius: 2,
                bgcolor: 'primary.light',
              }}>
                <Typography variant="h5" sx={{
                  fontWeight: 'bold',
                  color: 'primary.contrastText',
                  fontSize: { xs: '1.2rem', sm: '1.2rem', md: '1.3rem' }, 
                }}>
                  Total a pagar: {formatoNumero.format(calcularTotal())}
                </Typography>
              </Paper>
            )}

            {cartItems.length > 0 && (
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
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' }, 
                  py: { xs: 1, sm: 1.5 }, 
                }}
                onClick={handleRealizarPedido}
                disabled={procesandoPedido}
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
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            backdropFilter: 'blur(3px)',
          }}
        >
          <Paper elevation={12} sx={{
            p: { xs: 3, sm: 4 }, 
            textAlign: 'center',
            borderRadius: 3,
            bgcolor: 'background.paper',
            color: 'text.primary',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: { xs: '250px', sm: '300px' }, 
            maxWidth: { xs: '90%', sm: '400px' }, 
          }}>
            <CircularProgress size={40} sx={{ color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: { xs: '1.3rem', sm: '1.5rem' } }}>
              Procesando pedido...
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
              Por favor, esperá un momento.
            </Typography>
          </Paper>
        </Box>
      )}
    </Container>
  );
}
export default PaginaDeProductos;
