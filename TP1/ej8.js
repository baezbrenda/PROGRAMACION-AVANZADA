//Combinar Objetos: Usa Object.assign para combinar dos objetos, persona1 y persona2, en un nuevo objeto. Imprime el resultado.

const persona2 = {
  ciudad: "Paraná",
  pais: "Argentina"
};
 
const personaCombinada = Object.assign({}, persona1, persona2);
console.log(personaCombinada);