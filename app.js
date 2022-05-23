const express = require('express');
const app = express();
const sequelize = require('./database/db');
require('./database/asociations')

// Middlewares
// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Rutas
app.get('/', (req, res) => {
  res.send("Hola mundo")
})

app.use('/api/posts', require('./routes/posts'));
app.use('/api/users', require('./routes/users'));
app.use('/api/addresses', require('./routes/addresses'));

//Iniciamos el servidor
app.listen(3000, () => {
  console.log("La app ha arrancado en el http://localhost:3000");

  //Conectamos a la base de datos
  //Force true: DROP TABLES
  sequelize.sync({ force: false }).then(() => {
    console.log("Nos hemos conectado a la ddbb")
  }).catch(e => console.log(e))
})