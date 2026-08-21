//Envío de Datos a una API: Crea una función llamada enviarDatos que tome un objeto data y haga una petición POST a la API https://jsonplaceholder.typicode.com/posts. La función debe
//imprimir la respuesta de la API.

function enviarDatos(data) {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(respuesta => console.log(respuesta))
    .catch(error => console.log("Error:", error));
}

enviarDatos({ titulo: "Mi post", contenido: "Contenido de prueba" });