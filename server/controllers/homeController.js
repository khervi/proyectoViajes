const Viaje= require('../models/Viajes');
const Testimonial= require('../models/Testimoniales');

exports.homePage=(req,res)=>{
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

};