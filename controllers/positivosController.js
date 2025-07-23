const positivosService = require('../services/positivoService.js');

exports.getPositivos = async (req, res) => {
    try {
        const data = await positivosService.obtenerCasos(req.query);
        res.status(200).json(data);
    } catch (error) {
        next(error);        
    }
};

exports.getPositivoById = async (req, res) => {
    try {
        const data = await positivosService.obtenerPorId(req.params.id);
        res.json(data);
    } catch (error) {
        next(error);
    }
};

exports.agregarCaso = async (req, res) => {
    try {
        const nuevoCaso = req.body;
        const RegistroCreado = await positivosService.agregarCaso(nuevoCaso);
        res.status(201).json(RegistroCreado);
    } catch (error) {
        console.error('Error al agregar caso:', error.message);
        res.status(500).json({ error: 'Error al agregar caso' });
    }
}

exports.actualizarCaso = async (req, res) => {
    try {
        const id = req.params.id;
        const casoActualizado = req.body;
        const resultado = await positivosService.actualizarCaso(id, casoActualizado);
        if (!resultado) {
            return res.status(404).json({ message: 'Caso no encontrado' });
        }
        res.json(resultado);
    } catch (error) {
        console.error('Error al actualizar caso:', error.message);
        res.status(500).json({ error: 'Error al actualizar caso' });
    }
}

exports.eliminarCaso = async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await positivosService.eliminarCaso(id);
        if (!resultado) {
            return res.status(404).json({ message: 'Caso no encontrado' });
        }
        res.json({ message: 'Caso eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar caso:', error.message);
        res.status(500).json({ error: 'Error al eliminar caso' });
    }
}