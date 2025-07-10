import { useState, useEffect } from 'react';

const UseCarrito = () => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem('cartItems');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error('Error al parsear el carrito desde localStorage:', error);
      return [];
    }
  });
  // Estado para guardar los pedidos realizados
  const [pedidosRealizados, setPedidosRealizados] = useState(() => {
    try {
      const storedPedidos = localStorage.getItem('pedidos');
      return storedPedidos ? JSON.parse(storedPedidos) : [];
    } catch (error) {
      console.error('Error al parsear los pedidos desde localStorage:', error);
      return [];
    }
  });

  // Efecto para guardar el carrito en localStorage cada vez que cambia
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error al guardar el carrito en localStorage:', error);
    }
  }, [cartItems]);

  // Efecto para guardar los pedidos en localStorage cada vez que cambian
  useEffect(() => {
    try {
      localStorage.setItem('pedidos', JSON.stringify(pedidosRealizados));
    } catch (error) {
      console.error('Error al guardar los pedidos en localStorage:', error);
    }
  }, [pedidosRealizados]);
  const agregarCarrito = (producto, cantidad = 1) => {
    setCartItems((prevItems) => {
      const itemExistente = prevItems.find((item) => item.id === producto.id);
      if (itemExistente) {
        return prevItems.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        //  el producto tenga el precio correcto para el carrito
        return [...prevItems, { ...producto, cantidad }];
      }
    });
  };
  const restarCarrito = (producto, cantidad = 1) => {
    setCartItems((prevItems) => {
      const itemExistente = prevItems.find((item) => item.id === producto.id);
      if (itemExistente) {
        const nuevaCantidad = itemExistente.cantidad - cantidad;
        if (nuevaCantidad <= 0) {
          return prevItems.filter((item) => item.id !== producto.id);
        } else {
          return prevItems.map((item) =>
            item.id === producto.id
              ? { ...item, cantidad: nuevaCantidad }
              : item
          );
        }
      } else {
        return prevItems;
      }
    });
  };

  const quitarCarrito = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calcularTotal = () => {
    return cartItems.reduce((acc, item) => {
      const precioStringNormalizado = String(item.precio).replace(',', '.');
      const precioNumerico = parseFloat(precioStringNormalizado) || 0;
      const cantidadNumerica = parseInt(item.cantidad, 10) || 0;
      return acc + precioNumerico * cantidadNumerica;
    }, 0);
  };
  //  PARA REALIZAR EL PEDIDO 
  const realizarPedido = () => {
    if (cartItems.length === 0) {
      console.warn('El carrito está vacío, no se puede realizar el pedido.');
      return null;
    }
    const nuevoPedido = {
      id: Date.now(), // Un ID único para el pedido
      fecha: new Date().toLocaleString('es-AR'), // Fecha y hora del pedido
      items: cartItems, // Los productos del carrito en este momento
      total: calcularTotal(), // El total del carrito
    };
    setPedidosRealizados((prevPedidos) => [...prevPedidos, nuevoPedido]); // Agregamos el nuevo pedido a la lista
    setCartItems([]); // Vaciamos el carrito después de realizar el pedido
    console.log('Pedido realizado:', nuevoPedido);
    return nuevoPedido; // Devolvemos el pedido para usarlo en la UI si es necesario
  };
  return {
    cartItems,
    agregarCarrito,
    restarCarrito,
    quitarCarrito,
    calcularTotal,
    realizarPedido, 
    pedidosRealizados,
  };
};

export default UseCarrito;