const express = require('express');
const router = express.Router();

const Viaje= require('../models/Viajes');

module.exports = function(){
    router.get('/',(req,res)=>{
        res.render('index');
    });
    router.get('/nosotros',(req,res)=>{
        res.render('nosotros',{pagina:'SOBRE NOSOTROS'});
    });
    //buscar toodo de la base de datos 
    router.get('/viajes',(req,res)=>{
       // res.render('viajes',{pagina:'Proximos viajes'});
       Viaje.findAll()
       .then(viajes => res.render('viajes',{
           pagina:'Proximos Viajes Khervi ofrece',
           viajes //object literal ---> viajes:viajes y queda
       }))
       .catch(error=>console.log(error))
    });
    //buscar viaje por id
    router.get('/viajes/:id',(req,res)=>{
        Viaje.findByPk(req.params.id)//no hay findById
        .then(viaje => res.render('viaje',{viaje}))
        .catch(error => console.log(error))
    });

    router.get('/testimoniales',(req,res)=>{
        res.render('testimoniales',{
            pagina:'testimmonialessss'
        })
    });


    return router;
}