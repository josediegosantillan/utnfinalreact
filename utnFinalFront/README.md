# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
// eperoimental


import React from 'react';

import { Routes, Route } from 'react-router-dom';
// // Importa todos tus componentes de página

import Cafes from './paginas/Cafes';
import Vegano from './paginas/vegano';
import Pasteleria from './paginas/Pasteleria';
import Pedido from './paginas/Pedido'; // ¡Asegúrate que este componente esté bien importado!
import MenuNavInferior from './componentes/menuNavInferior/menuNavInferior'


function App() {
  return (
    <>
      Otros componentes que se muestran siempre, como un posible Navbar superior

      <Routes>
       
        <Route path="/" element={<Cafes />} /> 
        {/* O si tienes una página 'Principal' o 'HomePage' */}
        {/* <Route path="/" element={<Principal />} /> */}
        {/* <Route path="/" element={<HomePage />} /> */}
        
        {/* Rutas para los ítems de tu BottomNavigation (coinciden con MenuNavInferior) */}
        <Route path="/cafes" element={<Cafes />} />
        <Route path="/pasteleria" element={<Pasteleria />} />
        <Route path="/vegano" element={<Vegano />} />

        {/* La ruta para tu página de Pedido */}
        <Route path="/pedido" element={<Pedido />} />
        
        {/* La ruta comodín para 404 (descomentar si tienes el componente NotFoundPage) */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>

      {/* Tu BottomNavigation fijo en la parte inferior (se muestra en todas las páginas) */}
      <MenuNavInferior />
    </>
  );
}

export default App;