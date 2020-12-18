const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/', require('./routes/routes'));

app.set('json spaces', 2)

app.set("port", 3001);
app.listen(app.get("port"), () => {
    console.log('El servidor esta activo en el puerto 3001');
});