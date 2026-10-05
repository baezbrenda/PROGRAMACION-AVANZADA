-- Inicialización de la base de datos para TP01 - Manejador de Tareas de Proyectos de Software

CREATE TABLE IF NOT EXISTS tareas (
    id SERIAL PRIMARY KEY,
    nombre_proyecto VARCHAR(150) NOT NULL,
    tipo_actividad VARCHAR(50) NOT NULL,
    estado VARCHAR(30) NOT NULL DEFAULT 'Pendiente',
    resumen VARCHAR(255) NOT NULL,
    descripcion TEXT,
    prioridad VARCHAR(20) NOT NULL DEFAULT 'Media',
    informador VARCHAR(100) NOT NULL,
    persona_asignada VARCHAR(100),
    precondicion TEXT,
    fecha_creacion DATE NOT NULL DEFAULT CURRENT_DATE,
    fecha_cierre DATE,
    sprint VARCHAR(50),
    creado_en TIMESTAMP NOT NULL DEFAULT NOW(),
    actualizado_en TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Algunos datos de ejemplo para probar la app apenas levanta
INSERT INTO tareas (
    nombre_proyecto, tipo_actividad, estado, resumen, descripcion,
    prioridad, informador, persona_asignada, precondicion,
    fecha_creacion, fecha_cierre, sprint
) VALUES
(
    'Sistema de Gestión Académica', 'Historia de Usuario', 'En Progreso',
    'Alta de alumnos vía formulario web',
    'Como administrativo quiero dar de alta alumnos desde un formulario web para evitar la carga manual en planillas.',
    'Alta', 'Brenda Báez', 'Juan Pérez',
    'Contar con el modelo de datos de Alumno definido',
    '2026-09-01', NULL, 'Sprint 1'
),
(
    'Sistema de Gestión Académica', 'Bug', 'Pendiente',
    'Error al guardar fechas con huso horario incorrecto',
    'Las fechas de inscripción se guardan con un día de diferencia por un problema de zona horaria en el frontend.',
    'Urgente', 'Brenda Báez', 'María Gómez',
    'Ninguna',
    '2026-09-10', NULL, 'Sprint 1'
),
(
    'Sistema de Gestión Académica', 'Tarea Técnica', 'Finalizada',
    'Configurar Docker Compose del proyecto',
    'Armar los contenedores de frontend, backend y base de datos con Docker Compose para desarrollo local.',
    'Media', 'Brenda Báez', 'Brenda Báez',
    'Tener Docker instalado',
    '2026-08-20', '2026-08-25', 'Sprint 0'
);
