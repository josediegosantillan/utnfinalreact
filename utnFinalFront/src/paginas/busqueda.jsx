
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Alert,
  Paper,
  Dialog,
  DialogContent,
} from '@mui/material';
import BarraDeBusqueda from '../componentes/busqueda/barraDeBusqueda';
import ListaProductos from '../componentes/listaProductos/listaDeProductos';
import useTraerDatos from '../componentes/traerDatos/TraerDatos';
import useCarrito from '../componentes/carrito/carrito';
import ProductoCard from '../componentes/ProductoCard/ProductoCard'; // Asegúrate de la ruta correcta

const sheetId = '1PNKIsMzBQTftNvT05Tk6ZvtQYEL0itSiIL_jEMtS3BY';
const apiKey = 'AIzaSyDhJas-c3-hr0TdD-D3L3KdWcr50spU-Ww';

function Busqueda() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/CAFE!A3:Z?key=${apiKey}`;

  const { productos, loading, error } = useTraerDatos({ url: url });
  const { cartItems, agregarCarrito, restarCarrito, quitarCarrito } = useCarrito();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productDetailsModal, setProductDetailsModal] = useState(null);

  useEffect(() => {
    // Si los productos ya cargaron y hay un término de búsqueda, filtramos
    if (!loading && !error && productos.length > 0) {
      if (searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const results = productos.filter(
          (product) =>
            product.nombre.toLowerCase().includes(lowerCaseSearchTerm) ||
            product.descripcion.toLowerCase().includes(lowerCaseSearchTerm) ||
            (product.infoExtra && product.infoExtra.toLowerCase().includes(lowerCaseSearchTerm)) ||
            (product.tipo && product.tipo.toLowerCase().includes(lowerCaseSearchTerm))
        );
        setFilteredProducts(results);
      } else {
        // Si no hay término de búsqueda, la lista de resultados está vacía.
        setFilteredProducts([]);
      }
    } else if (!loading && !error && !searchTerm) {
        // Si no hay productos (o aún no cargaron) y no hay término de búsqueda, aseguramos que la lista esté vacía.
        setFilteredProducts([]);
    }
  }, [productos, loading, error, searchTerm]);

  
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  // Funciones de manejo de carrito y detalles (sin cambios, ya están bien)
  const handleMasMenos = (producto, action) => {
    if (action === '+') {
      agregarCarrito(producto, 1);
    } else if (action === '-') {
      const itemEnCarrito = cartItems.find(item => item.id === producto.id);
      if (itemEnCarrito && itemEnCarrito.cantidad > 1) {
        restarCarrito(producto, 1);
      } else if (itemEnCarrito && itemEnCarrito.cantidad === 1) {
        quitarCarrito(producto.id);
      }
    }
  };

  const handleOpenDetails = (producto) => { setProductDetailsModal(producto); };
  const handleCloseDetails = () => { setProductDetailsModal(null); };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size={60} sx={{ mb: 2 }} />
        <Typography variant="h6" color="text.secondary">Cargando productos para buscar...</Typography>
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', p: 3 }}>
        <Alert severity="error" sx={{ width: '100%', maxWidth: 400 }}>
          No pudimos cargar los productos para la búsqueda. Por favor, intentá de nuevo más tarde. {error.message}
        </Alert>
      </Box>
    );
  }
  return (
    <Container maxWidth="sm" sx={{ pt: 4, pb: 10 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
        Buscar Productos
      </Typography>
      <BarraDeBusqueda onSearch={handleSearch} searchTerm={searchTerm} />
      {searchTerm ? ( // Si hay un término de búsqueda...
        filteredProducts.length > 0 ? ( // ...y se encontraron productos...
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Resultados para "{searchTerm}":
            </Typography>
            <ListaProductos
              products={filteredProducts}
              onMasMenos={handleMasMenos}
              onOpenDetails={handleOpenDetails}
              cartItems={cartItems}
            />
          </Box>
        ) : ( // ...o no se encontraron productos.
          <Paper elevation={2} sx={{ p: 3, textAlign: 'center', mt: 3 }}>
            <Typography variant="h6" color="text.secondary">
              No se encontraron productos para "{searchTerm}".
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Intentá con otro término de búsqueda.
            </Typography>
          </Paper>
        )
      ) : ( // Si no hay un término de búsqueda (campo vacío)...
        <Paper elevation={2} sx={{ p: 3, textAlign: 'center', mt: 3 }}>
          <Typography variant="h6" color="text.secondary">
            Escribí algo para buscar productos.
          </Typography>
        </Paper>
      )}

      {/*ProductoCard) */}
      <Dialog
        open={!!productDetailsModal}
        onClose={handleCloseDetails}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 3,
            overflow: 'hidden',
          },
        }}
      >
        <DialogContent sx={{ position: 'relative', p: 0 }}>
          {productDetailsModal && (
            <ProductoCard
              producto={productDetailsModal}
              onCloseDetails={handleCloseDetails}
            />
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default Busqueda;