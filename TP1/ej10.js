//Métodos Getters y Setters: Añade un getter y un setter al objeto libro para la propiedad añoDePublicacion. Usa el setter para actualizar el año de publicación y luego usa el getter para leerlo.

const libro = {
  titulo: "Cien años de soledad",
  autor: "Gabriel García Márquez",
  _añoDePublicacion: 1967,

  get añoDePublicacion() {
    return this._añoDePublicacion;
  },

  set añoDePublicacion(nuevoAño) {
    this._añoDePublicacion = nuevoAño;
  }
};

libro.añoDePublicacion = 1970;
console.log(libro.añoDePublicacion);