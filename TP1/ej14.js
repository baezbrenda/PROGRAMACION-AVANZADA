//Función que Devuelve un Objeto: Crea una función llamada crearPersona que tome nombre y edad como parámetros y devuelva un objeto con esas propiedades.

function crearPersona(nombre, edad) {
  return {
    nombre: nombre,
    edad: edad
  };
}

const persona = crearPersona("Ana", 30);
console.log(persona);