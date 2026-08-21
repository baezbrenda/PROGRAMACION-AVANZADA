//Métodos en Objetos: Añade un método llamado descripción al objeto libro que devuelva una cadena describiendo el título y el autor del libro. Invoca este método e imprime el resultado.

const libro = {
  titulo: "Cien años de soledad",
  autor: "Gabriel García Márquez",
  añoDePublicacion: 1967
};

libro.descripcion = function () {
  return `${this.titulo}, escrito por ${this.autor}.`;
};

console.log(libro.descripcion());