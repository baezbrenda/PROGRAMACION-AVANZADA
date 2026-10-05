import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

const CAMPOS = [
  'nombre_proyecto', 'tipo_actividad', 'estado', 'resumen', 'descripcion',
  'prioridad', 'informador', 'persona_asignada', 'precondicion',
  'fecha_creacion', 'fecha_cierre', 'sprint',
];

// GET /api/tareas -> lista todas las tareas (listado de tareas)
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM tareas ORDER BY creado_en DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener las tareas.' });
  }
});

// GET /api/tareas/:id -> una tarea puntual
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM tareas WHERE id = $1', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Tarea no encontrada.' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener la tarea.' });
  }
});

// POST /api/tareas -> crea una nueva tarea (alta desde el formulario)
router.post('/', async (req, res) => {
  const body = req.body;

  if (!body.nombre_proyecto || !body.resumen || !body.informador) {
    return res.status(400).json({
      error: 'Nombre del Proyecto, Resumen e Informador son obligatorios.',
    });
  }

  const valores = CAMPOS.map((campo) => body[campo] ?? null);
  const placeholders = CAMPOS.map((_, i) => `$${i + 1}`).join(', ');

  try {
    const { rows } = await pool.query(
      `INSERT INTO tareas (${CAMPOS.join(', ')}) VALUES (${placeholders}) RETURNING *`,
      valores
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear la tarea.' });
  }
});

// PUT /api/tareas/:id -> edita una tarea existente
router.put('/:id', async (req, res) => {
  const body = req.body;
  const valores = CAMPOS.map((campo) => body[campo] ?? null);
  const setClause = CAMPOS.map((campo, i) => `${campo} = $${i + 1}`).join(', ');

  try {
    const { rows } = await pool.query(
      `UPDATE tareas SET ${setClause}, actualizado_en = NOW() WHERE id = $${CAMPOS.length + 1} RETURNING *`,
      [...valores, req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Tarea no encontrada.' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al editar la tarea.' });
  }
});

// PATCH /api/tareas/:id/finalizar -> finaliza la tarea (estado = Finalizada + fecha de cierre = hoy)
router.patch('/:id/finalizar', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `UPDATE tareas
       SET estado = 'Finalizada', fecha_cierre = CURRENT_DATE, actualizado_en = NOW()
       WHERE id = $1 RETURNING *`,
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Tarea no encontrada.' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al finalizar la tarea.' });
  }
});

// DELETE /api/tareas/:id -> elimina una tarea
router.delete('/:id', async (req, res) => {
  try {
    const { rowCount } = await pool.query('DELETE FROM tareas WHERE id = $1', [req.params.id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Tarea no encontrada.' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar la tarea.' });
  }
});

export default router;
