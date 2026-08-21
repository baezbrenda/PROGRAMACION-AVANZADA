//Transformación de Datos: Crea una función llamada mapearUsuarios que tome un array de usuarios obtenidos de la API y devuelva un nuevo array con solo las propiedades nombre y email de cada usuario.

function mapearUsuarios(usuarios) {
  return usuarios.map(usuario => ({
    nombre: usuario.name,
    email: usuario.email
  }));
}

fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => response.json())
  .then(usuarios => {
    const resultado = mapearUsuarios(usuarios);
    console.log(resultado);
  });