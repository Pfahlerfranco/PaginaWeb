const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const conectarDB = require('./config/database');
const { config } = require('dotenv');
const cors = require('cors')

const {contact , portfolio, auth} = require('./routes/main');


require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 5000

//MiddLeware
app.use(express.json())
app.use(cors())

//Routers
app.use('/api/contact', contact)
app.use('/api/portfolio', portfolio)
app.use('/api', auth);

// Swagger
// const swaggerDocument = YAML.load('./swagger.yaml');
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Conexion DB
conectarDB()

//App
app.listen(PORT, () => {
    console.log(`Listen in the PORT ${PORT}`);
    
}) 