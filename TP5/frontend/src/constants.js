export const TIPOS_ACTIVIDAD = [
  'Historia de Usuario',
  'Bug',
  'Tarea Técnica',
  'Mejora',
  'Investigación (Spike)',
];

export const ESTADOS = ['Pendiente', 'En Progreso', 'En Revisión', 'Bloqueada', 'Finalizada'];

export const PRIORIDADES = ['Baja', 'Media', 'Alta', 'Urgente'];

export const TAREA_VACIA = {
  nombre_proyecto: '',
  tipo_actividad: TIPOS_ACTIVIDAD[0],
  estado: ESTADOS[0],
  resumen: '',
  descripcion: '',
  prioridad: PRIORIDADES[1],
  informador: '',
  persona_asignada: '',
  precondicion: '',
  fecha_creacion: new Date().toISOString().slice(0, 10),
  fecha_cierre: '',
  sprint: '',
};
