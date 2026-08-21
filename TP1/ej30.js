//Actualización de Información del Usuario: Crea una función llamada actualizarUsuario que tome un objeto usuario y una lista de cambios a aplicar. La función debe retornar el
//usuario con las propiedades actualizadas.

function actualizarUsuario(usuario, cambios) {
  return { ...usuario, ...cambios };
}

const usuario = { id: 1, nombre: "Brenda", edad: 22 };
const usuarioActualizado = actualizarUsuario(usuario, { edad: 23, ciudad: "Paraná" });

console.log(usuario); 
console.log(usuarioActualizado); 