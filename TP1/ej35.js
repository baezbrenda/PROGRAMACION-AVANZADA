//Uso de filter: Crea una función llamada filtrarMayoresDe que tome un array de números y un valor de referencia, y devuelva un nuevo array solo con los números mayores que ese valor. Usa filter.

function filtrarMayoresDe(numeros, valorReferencia) {
  return numeros.filter(numero => numero > valorReferencia);
}

console.log(filtrarMayoresDe([3, 8, 15, 2, 20], 10)); 