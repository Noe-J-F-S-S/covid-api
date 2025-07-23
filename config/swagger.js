const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Casos Positivos de COVID',
            version: '1.0.0',
            description: 'API para gestionar casos positivos de COVID-19',
        },
        servers:[
            {
                url: 'http://localhost:3001/api',
            },
        ],
    },
    apis:['./routes/positivos.js'],
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUI,
    specs,
}