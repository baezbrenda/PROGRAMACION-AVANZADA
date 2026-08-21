//Validación de Formularios: Crea una función llamada validarFormulario que tome un objeto con los campos nombre, email y password. La función debe devolver true si todos los campos están presentes y no están vacíos, y false en caso contrario.

function validarFormulario(formulario) {
  return (
    Boolean(formulario.nombre) &&
    Boolean(formulario.email) &&
    Boolean(formulario.password)
  );
}

console.log(validarFormulario({ nombre: "Brenda", email: "brenda@mail.com", password: "1234" }));
console.log(validarFormulario({ nombre: "", email: "brenda@mail.com", password: "1234" })); 