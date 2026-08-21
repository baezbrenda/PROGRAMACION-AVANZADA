//Uso de reduce: Crea una función llamada sumarElementos que tome un array de números y devuelva la suma de todos los elementos del array usando reduce.

function sumarElementos(numeros) {
  return numeros.reduce((acumulador, numero) => acumulador + numero, 0);
}

console.log(sumarElementos([1, 2, 3, 4, 5])); 