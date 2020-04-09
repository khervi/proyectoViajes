const Viaje= require('../models/Viajes');
const Testimonial= require('../models/Testimoniales');

exports.homePage = async (req,res)=>{
    //creando arreglo de promises
    //const promises= [];
      //  promises.push( Viaje.findAll({ limit:3 }))
      //  promises.push( Testimonial.findAll({ limit:3 }))
     const viajes = await Viaje.findAll({ limit:3 })
     const testimoniales = await Testimonial.findAll({ limit:3 })
            //pasarl al promise y ejecutarlo
            //const resultado= Promise.all(promises);
            res.render('index',{
                pagina:'Proximos Viajes Khervi ofrece',
                clase:'home',
                viajes, //object literal ---> viajes:viajes y queda
                testimoniales
             })

};