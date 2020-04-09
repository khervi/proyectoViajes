const express = require('express');
const router = express.Router();

const Viaje= require('../models/Viajes');
const Testimonial= require('../models/Testimoniales');

module.exports = function(){
    router.get('/',(req,res)=>{
        //creando arreglo de promises
        const promises= [];

        promises.push( Viaje.findAll({ limit:3 }))
        promises.push( Testimonial.findAll({ limit:3 }))
        //pasarl al promise y ejecutarlo
        const resultado= Promise.all(promises);
        
       resultado.then(resultado => res.render('index',{
           pagina:'Proximos Viajes Khervi ofrece',
           clase:'home',
           viajes: resultado[0], //object literal ---> viajes:viajes y queda
           testimoniales: resultado[1]
        }))
       .catch(error=>console.log(error))
    
    });
    // ***********************************
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
//para listar el testimonial
    router.get('/testimoniales',(req,res)=>{
            Testimonial.findAll()
                .then(testimoniales => res.render('testimoniales',{pagina: 'Testimoniales',testimoniales}))  
                .catch(error => console.log(error))      
        
    });
//para llenar el formulario testimonial
    router.post('/testimoniales',(req,res)=>{
        // VALIDAR que todos los campos esten llenos
        let {nombre,correo,mensaje} = req.body;

        let errores=[];
        if(!nombre){
            errores.push({'mensaje':'Agrega tu nombre'});
        }
        if(!correo){
            errores.push({'mensaje':'falta correo'});
        }
        if(!mensaje){
            errores.push({'mensaje':'Agrega tu mensaje'})
        }
        //revisar por errores
        if(errores.length>0){
            //muestra la vista de errores y los campos llenos 
            res.render('testimoniales',{ //al renderear mandar la vista , seguido del obj {nombre:nombre}= {nombre}
                errores,
                nombre,
                correo,
                mensaje
            })
        } else {
            //almacenar a la base de datos  --- CREAR
            Testimonial.create({ nombre,correo,mensaje })
                .then(testimonial => res.redirect('/testimoniales'))
                .catch(error=>console.log(error));

        }

    });




    return router;
}