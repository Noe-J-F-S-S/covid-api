
const express = require('express');
const router = express.Router();
const positivosController = require('../controllers/positivosController');

// GET 
router.get('/', positivosController.getPositivos);
// GET by ID
router.get('/:id', positivosController.getPositivoById);
// POST
router.post('/', positivosController.agregarCaso);
// PUT
router.put('/:id', positivosController.actualizarCaso);
// DELETE
router.delete('/:id', positivosController.eliminarCaso);



// const express = require('express');
// const router = express.Router();
// const pool = require('../db');



// //GET /api/positivos?limit=50&offset=0&search=tumbes
// router.get('/', async (req, res) => {
//   const limit = parseInt(req.query.limit) || 50;
//   const offset = parseInt(req.query.offset) || 0;
//   const search = req.query.search || '';

//   try {
//     let query, values, countQuery, countValues;

//     if (search !== '') {
//       query = `
//         SELECT * FROM positivos_covid 
//         WHERE departamento ILIKE $1 
//         ORDER BY id_persona ASC 
//         LIMIT $2 OFFSET $3
//       `;
//       values = [`%${search}%`, limit, offset];

//       countQuery = `SELECT COUNT(*) FROM positivos_covid WHERE departamento ILIKE $1`;
//       countValues = [`%${search}%`];
//     } else {
//       query = `
//         SELECT * FROM positivos_covid 
//         ORDER BY id_persona ASC 
//         LIMIT $1 OFFSET $2
//       `;
//       values = [limit, offset];

//       countQuery = `SELECT COUNT(*) FROM positivos_covid`;
//       countValues = [];
//     }

//     const [resultados, total] = await Promise.all([
//       pool.query(query, values),
//       pool.query(countQuery, countValues)
//     ]);

//     res.json({
//       total: parseInt(total.rows[0].count),
//       resultados: resultados.rows
//     });
//   } catch (err) {
//     console.error('Error en endpoint GET /api/positivos:', err);
//     res.status(500).json({ error: 'Error del servidor' });
//   }
// });

// // GEt /api/positivos/:id
// router.get('/:id', async(req,res) => {
//   try {
//     const id= req.params.id;
//     const result = await pool.query(
//       'SELECT * FROM positivos_covid WHERE id_persona = $1',
//       [id]
//     );
//     if (result.rows.length === 0 ) {
//       return res.status(404).json({message: 'No se encontró el registro'});
//     }
//     res.json(result.rows[0]); 
//   } catch (error) {
//     console.error('Error en la consulta:', error.message);
//     res.status(500).send('Error al obtener el registro');
//   }
// });



// //POST /api/positivos
// router.post('/', async (req, res) => {
//   const { fecha_corte, departamento, provincia, distrito, metododx, edad, sexo, fecha_resultado, ubigeo, id_persona } = req.body;
//   try {
//     const result = await pool.query(
//       `INSERT INTO positivos_covid 
//       (fecha_corte, departamento, provincia, distrito, metododx, edad, sexo, fecha_resultado, ubigeo, id_persona)
//       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
//       [fecha_corte, departamento, provincia, distrito, metododx, edad, sexo, fecha_resultado, ubigeo, id_persona]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Error al crear el registro');
//   }
// });

// //PUT /api/positivos/:id
// router.put('/:id', async (req, res) => {
//   const id = req.params.id;
//   const { departamento, provincia, distrito, metododx, edad, sexo, ubigeo } = req.body;
//   try {
//     const result = await pool.query(
//       `UPDATE positivos_covid SET 
//         departamento = $1,
//         provincia = $2,
//         distrito = $3,
//         edad = $4,
//         sexo = $5,
//         ubigeo = $6
//        WHERE id_persona = $7 RETURNING *`,
//       [ departamento, provincia, distrito, edad, sexo, ubigeo, id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: 'Registro no encontrado' });
//     }

//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Error al actualizar');
//   }
// });

// //DELETE /api/positivos/:id
// router.delete('/:id', async (req, res) => {
//   try {
//     const id = req.params.id;
//     const result = await pool.query('DELETE FROM positivos_covid WHERE id_persona = $1 RETURNING *', [id]);

//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: 'Registro no encontrado' });
//     }

//     res.json({ message: 'Registro eliminado' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Error al eliminar');
//   }
// });
module.exports = router;