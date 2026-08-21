//Autenticación Simulada: Crea una función llamada autenticarUsuario que tome un objeto credenciales con usuario y contraseña, y verifique si coinciden con un usuario predefinido. La función debe devolver true si la
//autenticación es exitosa y false en caso contrario.

function autenticarUsuario(credenciales) {
  const usuarioPredefinido = {
    usuario: "brenda",
    contraseña: "1234"
  };

  return (
    credenciales.usuario === usuarioPredefinido.usuario &&
    credenciales.contraseña === usuarioPredefinido.contraseña
  );
}

console.log(autenticarUsuario({ usuario: "brenda", contraseña: "1234" })); // true
console.log(autenticarUsuario({ usuario: "brenda", contraseña: "mala" })); // false