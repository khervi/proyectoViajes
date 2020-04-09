const express = require('express');
const routes = require('./routes');
const path = require('path');
const configs = require('./config');
const bodyParser= require('body-parser');
const db = require('./config/database');
//----------------------------
require('dotenv').config({ path:'variables.env' })

//configuracion de database conectada
db.authenticate()
    .then(()=> console.log('db conectada...'))
    .catch(error=> console.log(error))

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

//muestra el año actual y generando la ruta
app.use((req,res,next)=>{
    //crear fecha
    const fecha= new Date();
    res.locals.fechaActual=fecha.getFullYear();
    //genera la ruta
    res.locals.ruta=req.path;
    //console.log(res.locals);
    return next();

});

//ejecutamos el BODYPARSER
app.use(bodyParser.urlencoded({extended:true}));

//cargar las rutas
app.use('/',routes());

const host =process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port,host, () =>{
    console.log('el servidor levanto');
})
//app.listen(3000)