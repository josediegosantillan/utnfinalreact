import React, { useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Paper,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
function BarraDeBusqueda({ onSearch, searchTerm: initialSearchTerm = '' }) {
  const [localSearchTerm, setLocalSearchTerm] = useState(initialSearchTerm);
  const handleSearchChange = (event) => {
    setLocalSearchTerm(event.target.value);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    onSearch(localSearchTerm);
  };
  return (
    <Paper elevation={3} sx={{ p: 2, mb: 3, mt: 2, borderRadius: 2 }}>
      <form onSubmit={handleSearchSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar productos..."
          value={localSearchTerm}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit" aria-label="buscar producto">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
      </form>
    </Paper>
  );
}
export default BarraDeBusqueda;
