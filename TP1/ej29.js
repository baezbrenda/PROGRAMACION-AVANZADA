//Generación de Token de Autenticación: Crea una función llamada generarToken que tome un objeto usuario y devuelva un token JWT simulado como una cadena. Puedes usar una función como btoa (Base64) para simular la generación del
//token.

function generarToken(usuario) {
  const datos = JSON.stringify(usuario);
  return btoa(datos); 
}

const usuario = { id: 1, nombre: "Brenda" };
const token = generarToken(usuario);
console.log(token);