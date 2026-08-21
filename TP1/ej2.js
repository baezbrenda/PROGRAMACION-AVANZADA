// Anidación de Objetos: Crea un objeto llamado estudiante con propiedades nombre, edad y direccion. direccion debe ser otro objeto con propiedades calle, ciudad y pais. Imprime la dirección completa del estudiante.

const estudiante = {
  nombre: "Brenda",
  edad: 22,
  direccion: {
    calle: "San Martín 123",
    ciudad: "Concepción del Uruguay",
    pais: "Argentina"
  }
};

console.log(`${estudiante.direccion.calle}, ${estudiante.direccion.ciudad}, ${estudiante.direccion.pais}`);