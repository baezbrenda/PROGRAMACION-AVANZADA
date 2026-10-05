// La URL del backend se puede sobreescribir con una variable de entorno de Vite
// (VITE_API_URL), pero por defecto apunta al servicio "backend" vía proxy del navegador.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function manejarRespuesta(res) {
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Ocurrió un error inesperado.');
  }
  return data;
}

export const api = {
  listar: () => fetch(`${API_URL}/tareas`).then(manejarRespuesta),

  crear: (tarea) =>
    fetch(`${API_URL}/tareas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tarea),
    }).then(manejarRespuesta),

  editar: (id, tarea) =>
    fetch(`${API_URL}/tareas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tarea),
    }).then(manejarRespuesta),

  finalizar: (id) =>
    fetch(`${API_URL}/tareas/${id}/finalizar`, { method: 'PATCH' }).then(manejarRespuesta),

  eliminar: (id) =>
    fetch(`${API_URL}/tareas/${id}`, { method: 'DELETE' }).then(manejarRespuesta),
};
