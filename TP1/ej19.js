//Función que Devuelve Otra Función: Crea una función llamada crearMultiplicador que tome un número x y devuelva una nueva función que multiplique cualquier número por x.

function crearMultiplicador(x) {
  return function (numero) {
    return numero * x;
  };
}

const multiplicarPorTres = crearMultiplicador(3);
console.log(multiplicarPorTres(4)); 

const multiplicarPorDiez = crearMultiplicador(10);
console.log(multiplicarPorDiez(5)); 