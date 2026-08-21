//Búsqueda de Usuarios: Crea una función llamada buscarUsuarioPorEmail que tome un array de usuarios y un email como parámetros, y devuelva el usuario que coincida con el email proporcionado. Usa el método find para
//implementarlo.

function buscarUsuarioPorEmail(usuarios, email) {
  return usuarios.find(usuario => usuario.email === email);
}

fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => response.json())
  .then(usuarios => {
    const encontrado = buscarUsuarioPorEmail(usuarios, "Sincere@april.biz");
    console.log(encontrado);
  });