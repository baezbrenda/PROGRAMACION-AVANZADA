import pg from 'pg';

const { Pool } = pg;

// La configuración se toma de variables de entorno (definidas en docker-compose.yml)
export const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'tp01_tareas',
});

// Reintenta la conexión unos segundos, útil porque el contenedor de Postgres
// puede tardar un poco más en levantar que el backend.
export async function waitForDb(retries = 10, delayMs = 3000) {
  for (let i = 1; i <= retries; i++) {
    try {
      await pool.query('SELECT 1');
      console.log('Conexión a PostgreSQL establecida.');
      return;
    } catch (err) {
      console.log(`Intento ${i}/${retries}: esperando a PostgreSQL... (${err.code || err.message})`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  throw new Error('No se pudo conectar a PostgreSQL después de varios intentos.');
}
