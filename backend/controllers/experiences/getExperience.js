const getDB = require('../../bbdd/db');

const getExperience = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idExp } = req.params;

        // Obtenemos la información de la entrada.
        const [experience] = await connection.query(
            `
                SELECT *
                FROM experiences
                WHERE id = ?;
            `,
            [idExp]
        );

        // Obtenemos la información de las fotos asiganadas a la entrada.
        const [photos] = await connection.query(
            `SELECT id, url, alt FROM photos WHERE id_experiencia = ?`,
            [idExp]
        );

        res.send({
            status: 'ok',
            data: {
                ...experience[0],
                photos,
            },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getExperience;
