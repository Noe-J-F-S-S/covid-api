
const express = require('express');
const router = express.Router();
const positivosController = require('../controllers/positivosController');

// GET 
/**
 * @swagger
 * /positivos:
 *   get:
 *     summary: Obtener lista de casos positivos
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Número de registros por página
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Offset desde dónde iniciar
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Búsqueda por departamento
 *     responses:
 *       200:
 *         description: Lista de registros
 */
router.get('/', positivosController.getPositivos);
// GET by ID
/**
 * @swagger
 * /positivos/{id}:
 *   get:
 *     summary: Obtener un caso por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Caso encontrado
 *       404:
 *         description: Caso no encontrado
 */
router.get('/:id', positivosController.getPositivoById);
// POST
/**
 * @swagger
 * /positivos:
 *   post:
 *     summary: Crear un nuevo caso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha_corte:
 *                 type: string
 *                 format: date-time
 *               departamento:
 *                 type: string
 *               provincia:
 *                 type: string
 *               distrito:
 *                 type: string
 *               metododx:
 *                 type: string
 *               edad:
 *                 type: integer
 *               sexo:
 *                 type: string
 *               fecha_resultado:
 *                 type: string
 *                 format: date-time
 *               ubigeo:
 *                 type: string
 *               id_persona:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registro creado
 */
router.post('/', positivosController.agregarCaso);

// PUT
/**
 * @swagger
 * /positivos/{id}:
 *   put:
 *     summary: Actualizar un caso por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               departamento:
 *                 type: string
 *               provincia:
 *                 type: string
 *               distrito:
 *                 type: string
 *               edad:
 *                 type: integer
 *               sexo:
 *                 type: string
 *               ubigeo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registro actualizado
 *       404:
 *         description: No encontrado
 */
router.put('/:id', positivosController.actualizarCaso);
// DELETE
/**
 * @swagger
 * /positivos/{id}:
 *   delete:
 *     summary: Eliminar un caso por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro eliminado
 */
router.delete('/:id', positivosController.eliminarCaso);



module.exports = router;