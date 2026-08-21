//Uso de find: Crea un array de objetos llamados personas donde cada objeto tenga nombre y edad. Usa find para encontrar a la primera persona mayor de 30 años.

const personas = [
  { nombre: "Ana", edad: 25 },
  { nombre: "Carlos", edad: 35 },
  { nombre: "Marta", edad: 40 }
];

const mayorDe30 = personas.find(persona => persona.edad > 30);
console.log(mayorDe30); 