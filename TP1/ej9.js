//Copiar Objetos: Crea una copia profunda del objeto estudiante utilizando el método JSON.parse y JSON.stringify. Modifica la copia y verifica que el objeto original no haya sido alterado.

const estudiante = {
  nombre: "Brenda",
  edad: 21,
  direccion: {
    calle: "José Hernández 158",
    ciudad: "Colón",
    pais: "Argentina"
  }
};
 
const copiaEstudiante = JSON.parse(JSON.stringify(estudiante));
copiaEstudiante.nombre = "Otro Nombre";
copiaEstudiante.direccion.ciudad = "Otra Ciudad";
 
console.log(estudiante);       
console.log(copiaEstudiante);