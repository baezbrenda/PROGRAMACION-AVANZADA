const CLASE_PRIORIDAD = {
  Baja: 'prioridad-baja',
  Media: 'prioridad-media',
  Alta: 'prioridad-alta',
  Urgente: 'prioridad-urgente',
};

const CLASE_ESTADO = {
  Pendiente: 'estado-pendiente',
  'En Progreso': 'estado-progreso',
  'En Revisión': 'estado-revision',
  Bloqueada: 'estado-bloqueada',
  Finalizada: 'estado-finalizada',
};

function formatearFecha(fecha) {
  if (!fecha) return '—';
  const d = new Date(fecha);
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function TaskList({ tareas, cargando, onEditar, onEliminar, onFinalizar }) {
  if (cargando) {
    return <p className="estado-vacio">Cargando tareas…</p>;
  }

  if (tareas.length === 0) {
    return <p className="estado-vacio">Todavía no hay tareas cargadas. Creá la primera desde el formulario.</p>;
  }

  return (
    <div className="task-list">
      {tareas.map((tarea) => (
        <article key={tarea.id} className="task-card">
          <header className="task-card-header">
            <div>
              <span className="task-id">#{tarea.id}</span>
              <h3>{tarea.resumen}</h3>
              <p className="task-proyecto">{tarea.nombre_proyecto} · {tarea.tipo_actividad}</p>
            </div>
            <div className="badges">
              <span className={`badge ${CLASE_PRIORIDAD[tarea.prioridad] || ''}`}>{tarea.prioridad}</span>
              <span className={`badge ${CLASE_ESTADO[tarea.estado] || ''}`}>{tarea.estado}</span>
            </div>
          </header>

          {tarea.descripcion && <p className="task-descripcion">{tarea.descripcion}</p>}

          <dl className="task-detalles">
            <div><dt>Informador</dt><dd>{tarea.informador}</dd></div>
            <div><dt>Asignado</dt><dd>{tarea.persona_asignada || '—'}</dd></div>
            <div><dt>Sprint</dt><dd>{tarea.sprint || '—'}</dd></div>
            <div><dt>Creación</dt><dd>{formatearFecha(tarea.fecha_creacion)}</dd></div>
            <div><dt>Cierre</dt><dd>{formatearFecha(tarea.fecha_cierre)}</dd></div>
          </dl>

          {tarea.precondicion && (
            <p className="task-precondicion"><strong>Precondición:</strong> {tarea.precondicion}</p>
          )}

          <footer className="task-card-footer">
            <button className="btn btn-secundario" onClick={() => onEditar(tarea)}>Editar</button>
            {tarea.estado !== 'Finalizada' && (
              <button className="btn btn-exito" onClick={() => onFinalizar(tarea.id)}>Finalizar</button>
            )}
            <button className="btn btn-peligro" onClick={() => onEliminar(tarea.id)}>Eliminar</button>
          </footer>
        </article>
      ))}
    </div>
  );
}
