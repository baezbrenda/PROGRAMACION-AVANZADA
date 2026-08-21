//Actualización de Propiedades: Modifica el valor de la propiedad precio del objeto producto y luego imprime el objeto completo para verificar el cambio.

const producto = {
  nombre: "Notebook",
  precio: 500000,
  disponible: true
};

producto.precio = 450000;
console.log(producto);