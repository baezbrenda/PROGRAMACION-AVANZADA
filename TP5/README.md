# TP5 — Gestor de Tareas de Proyectos de Software

Aplicación full-stack que funciona como manejador de tareas de proyectos de software (tipo Jira simplificado).

## Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express (API REST)
- **Base de datos:** PostgreSQL
- **Infraestructura:** Docker + Docker Compose (3 contenedores: frontend, backend, db)

## Estructura del proyecto

```
tp5-task-manager/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── init.sql              # Crea la tabla "tareas" y carga datos de ejemplo
│   ├── package.json
│   └── src/
│       ├── index.js          # Servidor Express
│       ├── db.js             # Conexión a PostgreSQL
│       └── routes/tasks.js   # Endpoints CRUD de tareas
└── frontend/
    ├── Dockerfile
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx           # Componente raíz: conecta formulario + listado
        ├── App.css
        ├── api.js            # Cliente HTTP hacia el backend
        ├── constants.js      # Opciones de los selects (estado, prioridad, etc.)
        └── components/
            ├── TaskForm.jsx  # Formulario de alta / edición
            └── TaskList.jsx  # Listado de tareas
```

## Campos del formulario

Nombre del Proyecto, Tipo de Actividad, Estado, Resumen, Descripción, Prioridad,
Informador, Persona Asignada, Precondición, Fecha de Creación, Fecha de Cierre, Sprint.

## Funcionalidad implementada

- **Alta** de tareas desde el formulario.
- **Listado** de tareas en tarjetas, con badges de estado y prioridad.
- **Editar**: carga la tarea seleccionada en el formulario para modificarla.
- **Eliminar**: borra la tarea (con confirmación).
- **Finalizar**: cambia el estado a "Finalizada" y completa automáticamente la Fecha de Cierre con la fecha actual.
- Persistencia real en PostgreSQL (no se pierde al recargar la página).

## Cómo correrlo

### Requisito

Tener **Docker** y **Docker Compose** instalados.

### Pasos

1. Pararse en la carpeta raíz del proyecto (`tp01-task-manager/`).
2. Levantar todo con:

   ```bash
   docker compose up --build
   ```

3. Esperar a que los 3 contenedores terminen de levantar. El backend espera automáticamente a que la base de datos esté lista.
4. Abrir en el navegador:

   - **Frontend:** http://localhost:5173
   - **API (backend):** http://localhost:4000/api/tareas
   - **PostgreSQL:** accesible en `localhost:5432` (usuario `postgres`, password `postgres`, base `tp01_tareas`), por si querés conectarte con un cliente SQL como DBeaver o pgAdmin.

5. Para parar todo:

   ```bash
   docker compose down
   ```

   Si además querés borrar los datos guardados en la base (empezar de cero):

   ```bash
   docker compose down -v
   ```

### Datos de ejemplo

El archivo `backend/init.sql` carga 3 tareas de ejemplo la primera vez que se crea la base de datos, para que el listado no arranque vacío.

## Endpoints de la API

| Método | Ruta                       | Descripción                              |
|--------|----------------------------|-------------------------------------------|
| GET    | `/api/tareas`               | Lista todas las tareas                    |
| GET    | `/api/tareas/:id`           | Obtiene una tarea puntual                 |
| POST   | `/api/tareas`               | Crea una nueva tarea                      |
| PUT    | `/api/tareas/:id`           | Edita una tarea existente                 |
| PATCH  | `/api/tareas/:id/finalizar` | Marca la tarea como Finalizada            |
| DELETE | `/api/tareas/:id`           | Elimina una tarea                         |

## Correrlo sin Docker (modo desarrollo, opcional)

Si en algún momento querés levantar cada parte por separado sin contenedores:

**Base de datos:** necesitás un PostgreSQL corriendo localmente, con una base `tp01_tareas` y correr `backend/init.sql` sobre ella.

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
