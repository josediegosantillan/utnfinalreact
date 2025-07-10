// src/components/traerDatos/TraerDatos.jsx
import { useState, useEffect } from 'react';

function useTraerDatos ({url}) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductoData = async () => {
      setError(null);
      setProductos([]);
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.values && Array.isArray(data.values)) {
          const parsedProductos = data.values.map((item, index) => {
            const id = item[0] || `item-${index}`;
            const nombre = item[0] || 'Nombre no disponible';
            const precio = parseFloat(String(item[1] || '0').replace(',', '.')) || 0;
            const imagen = item[2] || '';
            const descripcion = item[3] || 'Sin descripción.';
            const infoExtra = item[4] || 'Sin información extra.';
            const tipo = item[5];
            return {
              id: id,
              nombre: nombre,
              precio: precio,
              imagen: imagen,
              descripcion: descripcion,
              infoExtra: infoExtra,
              tipo: tipo,
            };
        });
          setProductos(parsedProductos);
        } else {
          setProductos([]);
        }
      } catch (err) {
        console.error('Error al obtener los datos de la cafetería en useTraerDatos:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductoData();
  }, [url]);

  return {productos, loading, error};
}
export default useTraerDatos;