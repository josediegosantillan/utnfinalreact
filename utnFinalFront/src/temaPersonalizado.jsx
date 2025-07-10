import { createTheme } from '@mui/material/styles';

const TemaPersonalizado = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Un azul clásico
    },
    secondary: {
      main: '#dc004e', // Un rojo vibrante
    },
    background: {
      default: '#f4f6f8', // Un gris clarito para el fondo
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      color: '#592400',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    h5: {
      fontSize: '1.3rem',
      fontWeight: 700,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 700,
    },
  },
  spacing: 8, // Define la unidad de espaciado
});

export default TemaPersonalizado;