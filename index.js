const express = require('express');
const cors = require('cors');
const app = express();
const positivosRoutes = require('./routes/positivos');
const {swaggerUI, specs} = require('./config/swagger');



app.use(cors());
app.use(express.json());

// AQUI es donde se define la ruta base
app.use('/api/positivos', positivosRoutes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});