//Comprobación de Propiedades: Crea una función llamada tienePropiedad que tome un objeto y una cadena como parámetros, y devuelva true si el objeto tiene una propiedad con ese nombre, o false en caso contrario.

function tienePropiedad(objeto, propiedad) {
  return objeto.hasOwnProperty(propiedad);
}
 
console.log(tienePropiedad(producto, "precio"));
console.log(tienePropiedad(producto, "color"));
 