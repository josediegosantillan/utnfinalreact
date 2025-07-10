import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Cafes from './paginas/Cafes';
import Vegano from './paginas/Vegano';
import Pasteleria from './paginas/Pasteleria';
import Busqueda from './paginas/busqueda';
import MenuNavInferior from './componentes/menuNavInferior/menuNavInferior';
import PedidosPage from './componentes/PedidosPage/PedidosPage';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Cafes />} /> 
        <Route path="/cafes" element={<Cafes />} />
        <Route path="/pasteleria" element={<Pasteleria />} />
        <Route path="/vegano" element={<Vegano />} />
        <Route path="/pedido" element={<PedidosPage />} />
        <Route path="/buscar" element={<Busqueda />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
      <MenuNavInferior />
    </>
  );
}

export default App;
