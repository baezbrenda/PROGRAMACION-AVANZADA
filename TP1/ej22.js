//Procesamiento de Datos de una API: Usando la función obtenerUsuarios, crea otra función llamada imprimirNombresDeUsuarios que filtre y muestre solo los nombres de los usuarios.

function obtenerUsuarios() {
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json());
}

function imprimirNombresDeUsuarios() {
  obtenerUsuarios().then(usuarios => {
    const nombres = usuarios.map(usuario => usuario.name);
    console.log(nombres);
  });
}

imprimirNombresDeUsuarios();