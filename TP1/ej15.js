//Función que Modifica un Objeto: Crea una función llamada actualizarEdad que tome un objeto persona y un número nuevaEdad, y actualice la propiedad edad del objeto.

function actualizarEdad(persona, nuevaEdad) {
  persona.edad = nuevaEdad;
}

const persona = { nombre: "Ana", edad: 30 };
console.log(persona); 

actualizarEdad(persona, 31);
console.log(persona); 