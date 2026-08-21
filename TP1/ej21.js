//Consumo de Datos desde una API: Crea una función llamada obtenerUsuarios que haga una petición
//HTTP a la API https://jsonplaceholder.typicode.com/users usando
//fetch. Luego, imprime en la consola la lista de usuarios obtenida.

function obtenerUsuarios() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(usuarios => console.log(usuarios))
    .catch(error => console.log("Error:", error));
}

obtenerUsuarios();