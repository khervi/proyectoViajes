const express = require('express');
const routes = require('./routes');
const path = require('path');
const configs = require('./config');
const bodyParser= require('body-parser');
//const db = require('../config/database');

//configuracion de database conectada
/*db.authenticate()
    .then(()=> console.log('db conectada...'))
    .catch(error=> console.log(error))*/

//configurar expres
const app = express();

//habilitar pug
app.set('view engine','pug');

//añadir las vistas
app.set('views',path.join(__dirname,'./views'));
//cargar una carpeta estatica llamada public
app.use(express.static('public'));

////validar si estamos en desarrollo o en produccion
const config=configs[app.get('env')];
//creamos la variable para el sitio web
app.locals.titulo = config.nombresitio;

//muestra el año actual
app.use((req,res,next)=>{
    //crear fecha
    const fecha= new Date();
    res.locals.fechaActual=fecha.getFullYear();
    //console.log(res.locals);
    return next();

});

//ejecutamos el BODYPARSER
app.use(bodyParser.urlencoded({extended:true}));

//cargar las rutas
app.use('/',routes());

app.listen(3000)