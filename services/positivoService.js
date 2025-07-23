const pool = require('../db.js');

exports.obtenerCasos = async ({limit = 50, offset = 0, search = ''}) => {
    limit = parseInt(limit);
    offset = parseInt(offset); 

    if (search) {
        const query = `
            SELECT * FROM positivos_covid 
            WHERE departamento ILIKE $1 
            ORDER BY id_persona ASC 
            LIMIT $2 OFFSET $3
        `;
        const totalQuery = `Select COUNT(*) FROM positivos_covid WHERE departamento ILIKE $1`;
        const [rows, total] = await Promise.all([
            pool.query(query, [`%${search}%`, limit, offset]),
            pool.query(totalQuery, [`%${search}%`])
        ]);

        return {total: parseInt(total.rows[0].count), resultados: rows.rows};
    }else {
        const query = `select * from positivos_covid order by id_persona asc limit $1 offset $2`;
        const totalQuery = `Select COUNT(*) FROM positivos_covid`;

        const [rows, total] = await Promise.all([
            pool.query(query, [limit, offset]),
            pool.query(totalQuery)
        ]);
        return {total: parseInt(total.rows[0].count), resultados: rows.rows};
    }
};

exports.obtenerPorId = async (id) => {
    const result = await pool.query(
        'SELECT * FROM positivos_covid WHERE id_persona = $1',[id]);

    if (result.rows.length === 0) {
        throw new Error('No se encontró el caso con el ID proporcionado');
    }
    return result.rows[0];
};

exports.agregarCaso = async (caso) => {
    const {
        fecha_corte,
        departamento,
        provincia,
        distrito,
        metododx,
        edad,
        sexo,
        fecha_resultado,
        ubigeo,
        id_persona
    } = caso;

    const query = `
        INSERT INTO positivos_covid (
            fecha_corte, departamento, provincia, distrito, metododx, edad, sexo, fecha_resultado, ubigeo, id_persona
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
    `;

    const values = [
        fecha_corte,
        departamento,
        provincia,
        distrito,
        metododx,
        edad,  
        sexo,
        fecha_resultado,
        ubigeo,
        id_persona
    ];  

    const result = await pool.query(query, values);
    return result.rows[0];
}

exports.actualizarCaso = async (id, caso) => {
    const {
        departamento,
        provincia,
        distrito,
        edad,
        sexo,
        ubigeo
    } = caso;

    const query = `
        UPDATE positivos_covid SET 
            departamento = $1,
            provincia = $2,
            distrito = $3,
            edad = $4,
            sexo = $5,
            ubigeo = $6
        WHERE id_persona = $7
        RETURNING *
    `;
    const values = [
        departamento,
        provincia,
        distrito,
        edad,
        sexo,
        ubigeo,
        id
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
};

exports.eliminarCaso = async (id) => {
    const query = 'DELETE FROM positivos_covid WHERE id_persona = $1 RETURNING *';
    const result = await pool.query( query,[id]);
    return result.rows[0];
}