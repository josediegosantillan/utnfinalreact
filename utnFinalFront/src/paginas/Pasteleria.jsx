import PaginaDeProductos from '../componentes/paginaDeProductos/paginaDeProductos'; 
function Pasteleria() {
  return (
    <PaginaDeProductos 
      categoria="Pastelería" 
      hoja="PASTELERIA" // nombre de la hoja en tu Google Sheet
    />
  );
}
export default Pasteleria;