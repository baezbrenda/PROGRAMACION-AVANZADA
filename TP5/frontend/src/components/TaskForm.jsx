import { useEffect, useState } from 'react';
import { TIPOS_ACTIVIDAD, ESTADOS, PRIORIDADES, TAREA_VACIA } from '../constants.js';

export default function TaskForm({ tareaEnEdicion, onGuardar, onCancelar }) {
  const [form, setForm] = useState(TAREA_VACIA);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    setForm(tareaEnEdicion ? normalizarFechas(tareaEnEdicion) : TAREA_VACIA);
    setErrores({});
  }, [tareaEnEdicion]);

  function normalizarFechas(tarea) {
    return {
      ...tarea,
      fecha_creacion: tarea.fecha_creacion?.slice(0, 10) || '',
      fecha_cierre: tarea.fecha_cierre?.slice(0, 10) || '',
    };
  }

  function actualizarCampo(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  function validar() {
    const nuevosErrores = {};
    if (!form.nombre_proyecto.trim()) nuevosErrores.nombre_proyecto = 'Requerido';
    if (!form.resumen.trim()) nuevosErrores.resumen = 'Requerido';
    if (!form.informador.trim()) nuevosErrores.informador = 'Requerido';
    if (!form.fecha_creacion) nuevosErrores.fecha_creacion = 'Requerido';
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  function manejarEnvio(e) {
    e.preventDefault();
    if (!validar()) return;
    onGuardar({
      ...form,
      fecha_cierre: form.fecha_cierre || null,
      persona_asignada: form.persona_asignada || null,
      precondicion: form.precondicion || null,
      sprint: form.sprint || null,
    });
  }

  const esEdicion = Boolean(tareaEnEdicion);

  return (
    <form className="task-form" onSubmit={manejarEnvio}>
      <h2>{esEdicion ? `Editar tarea #${tareaEnEdicion.id}` : 'Nueva tarea'}</h2>

      <div className="campo">
        <label htmlFor="nombre_proyecto">Nombre del Proyecto *</label>
        <input
          id="nombre_proyecto"
          type="text"
          value={form.nombre_proyecto}
          onChange={(e) => actualizarCampo('nombre_proyecto', e.target.value)}
          placeholder="Ej: Sistema de Gestión Académica"
        />
        {errores.nombre_proyecto && <span className="error">{errores.nombre_proyecto}</span>}
      </div>

      <div className="fila">
        <div className="campo">
          <label htmlFor="tipo_actividad">Tipo de Actividad</label>
          <select
            id="tipo_actividad"
            value={form.tipo_actividad}
            onChange={(e) => actualizarCampo('tipo_actividad', e.target.value)}
          >
            {TIPOS_ACTIVIDAD.map((tipo) => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label htmlFor="estado">Estado</label>
          <select
            id="estado"
            value={form.estado}
            onChange={(e) => actualizarCampo('estado', e.target.value)}
          >
            {ESTADOS.map((estado) => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label htmlFor="prioridad">Prioridad</label>
          <select
            id="prioridad"
            value={form.prioridad}
            onChange={(e) => actualizarCampo('prioridad', e.target.value)}
          >
            {PRIORIDADES.map((prioridad) => (
              <option key={prioridad} value={prioridad}>{prioridad}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="campo">
        <label htmlFor="resumen">Resumen *</label>
        <input
          id="resumen"
          type="text"
          value={form.resumen}
          onChange={(e) => actualizarCampo('resumen', e.target.value)}
          placeholder="Título breve de la tarea"
        />
        {errores.resumen && <span className="error">{errores.resumen}</span>}
      </div>

      <div className="campo">
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          rows={4}
          value={form.descripcion}
          onChange={(e) => actualizarCampo('descripcion', e.target.value)}
          placeholder="Detalle completo de la tarea"
        />
      </div>

      <div className="campo">
        <label htmlFor="precondicion">Precondición</label>
        <textarea
          id="precondicion"
          rows={2}
          value={form.precondicion}
          onChange={(e) => actualizarCampo('precondicion', e.target.value)}
          placeholder="Qué debe cumplirse antes de empezar esta tarea"
        />
      </div>

      <div className="fila">
        <div className="campo">
          <label htmlFor="informador">Informador *</label>
          <input
            id="informador"
            type="text"
            value={form.informador}
            onChange={(e) => actualizarCampo('informador', e.target.value)}
            placeholder="Quién reporta la tarea"
          />
          {errores.informador && <span className="error">{errores.informador}</span>}
        </div>

        <div className="campo">
          <label htmlFor="persona_asignada">Persona Asignada</label>
          <input
            id="persona_asignada"
            type="text"
            value={form.persona_asignada}
            onChange={(e) => actualizarCampo('persona_asignada', e.target.value)}
            placeholder="Quién la va a resolver"
          />
        </div>

        <div className="campo">
          <label htmlFor="sprint">Sprint</label>
          <input
            id="sprint"
            type="text"
            value={form.sprint}
            onChange={(e) => actualizarCampo('sprint', e.target.value)}
            placeholder="Ej: Sprint 3"
          />
        </div>
      </div>

      <div className="fila">
        <div className="campo">
          <label htmlFor="fecha_creacion">Fecha de Creación *</label>
          <input
            id="fecha_creacion"
            type="date"
            value={form.fecha_creacion}
            onChange={(e) => actualizarCampo('fecha_creacion', e.target.value)}
          />
          {errores.fecha_creacion && <span className="error">{errores.fecha_creacion}</span>}
        </div>

        <div className="campo">
          <label htmlFor="fecha_cierre">Fecha de Cierre</label>
          <input
            id="fecha_cierre"
            type="date"
            value={form.fecha_cierre}
            onChange={(e) => actualizarCampo('fecha_cierre', e.target.value)}
          />
        </div>
      </div>

      <div className="acciones-form">
        <button type="submit" className="btn btn-primario">
          {esEdicion ? 'Guardar cambios' : 'Crear tarea'}
        </button>
        {esEdicion && (
          <button type="button" className="btn btn-secundario" onClick={onCancelar}>
            Cancelar edición
          </button>
        )}
      </div>
    </form>
  );
}
