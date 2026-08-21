//Paginación de Datos: Crea una función llamada obtenerPagina que tome un array de datos y un número de página. La función debe devolver los
//elementos correspondientes a esa página, asumiendo que cada página tiene 5 elementos.

function obtenerPagina(datos, numeroPagina) {
  const elementosPorPagina = 5;
  const inicio = (numeroPagina - 1) * elementosPorPagina;
  const fin = inicio + elementosPorPagina;
  return datos.slice(inicio, fin);
}

const datos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
console.log(obtenerPagina(datos, 1)); 
console.log(obtenerPagina(datos, 2)); 
console.log(obtenerPagina(datos, 3)); 