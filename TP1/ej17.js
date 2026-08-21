//Función con Función Interna: Crea una función llamada despedir que contenga una función interna adios. despedir debe devolver el resultado de llamar a adios.

function despedir() {
  function adios() {
    return "Adiós, que tengas un buen día.";
  }
  return adios();
}

console.log(despedir());