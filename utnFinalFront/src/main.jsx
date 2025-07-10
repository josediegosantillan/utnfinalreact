import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Para un reset de CSS básico
import App from './App.jsx';
import TemaPersonalizado from './temaPersonalizado'; // Importamos nuestro tema
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={TemaPersonalizado}>
      <CssBaseline /> {/* Opcional: Provee un CSS básico para normalizar estilos */}
      <BrowserRouter> 
         <App />
      </BrowserRouter>
    </ThemeProvider>
);
