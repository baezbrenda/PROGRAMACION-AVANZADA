import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import { api } from './api.js';

export default function App() {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [tareaEnEdicion, setTareaEnEdicion] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    cargarTareas();
  }, []);

  async function cargarTareas() {
    setCargando(true);
    try {
      const data = await api.listar();
      setTareas(data);
    } catch (err) {
      mostrarMensaje('error', err.message);
    } finally {
      setCargando(false);
    }
  }

  function mostrarMensaje(tipo, texto) {
    setMensaje({ tipo, texto });
    setTimeout(() => setMensaje(null), 4000);
  }

  async function guardarTarea(datos) {
    try {
      if (tareaEnEdicion) {
        const actualizada = await api.editar(tareaEnEdicion.id, datos);
        setTareas((prev) => prev.map((t) => (t.id === actualizada.id ? actualizada : t)));
        mostrarMensaje('exito', 'Tarea actualizada correctamente.');
      } else {
        const creada = await api.crear(datos);
        setTareas((prev) => [creada, ...prev]);
        mostrarMensaje('exito', 'Tarea creada correctamente.');
      }
      setTareaEnEdicion(null);
    } catch (err) {
      mostrarMensaje('error', err.message);
    }
  }

  async function eliminarTarea(id) {
    if (!window.confirm('¿Seguro que querés eliminar esta tarea? Esta acción no se puede deshacer.')) return;
    try {
      await api.eliminar(id);
      setTareas((prev) => prev.filter((t) => t.id !== id));
      mostrarMensaje('exito', 'Tarea eliminada.');
      if (tareaEnEdicion?.id === id) setTareaEnEdicion(null);
    } catch (err) {
      mostrarMensaje('error', err.message);
    }
  }

  async function finalizarTarea(id) {
    try {
      const actualizada = await api.finalizar(id);
      setTareas((prev) => prev.map((t) => (t.id === actualizada.id ? actualizada : t)));
      mostrarMensaje('exito', 'Tarea marcada como finalizada.');
    } catch (err) {
      mostrarMensaje('error', err.message);
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Gestor de Tareas de Proyectos</h1>
        <p>TP5 · React + Vite · Node/Express · PostgreSQL · Docker</p>
      </header>

      {mensaje && <div className={`toast toast-${mensaje.tipo}`}>{mensaje.texto}</div>}

      <main className="app-main">
        <section className="panel panel-form">
          <TaskForm
            tareaEnEdicion={tareaEnEdicion}
            onGuardar={guardarTarea}
            onCancelar={() => setTareaEnEdicion(null)}
          />
        </section>

        <section className="panel panel-list">
          <div className="panel-list-header">
            <h2>Listado de Tareas</h2>
            <span className="contador">{tareas.length} tarea{tareas.length !== 1 ? 's' : ''}</span>
          </div>
          <TaskList
            tareas={tareas}
            cargando={cargando}
            onEditar={setTareaEnEdicion}
            onEliminar={eliminarTarea}
            onFinalizar={finalizarTarea}
          />
        </section>
      </main>
    </div>
  );
}
