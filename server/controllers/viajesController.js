const Viaje = require('../models/Viajes');

exports.mostrarViajes = (req,res)=>{
    // res.render('viajes',{pagina:'Proximos viajes'});
    Viaje.findAll()
    .then(viajes => res.render('viajes',{
        pagina:'Proximos Viajes Khervi ofrece',
        viajes //object literal ---> viajes:viajes y queda
    }))
    .catch(error=>console.log(error))
 }

 exports.mostrarViaje = (req,res)=>{
    Viaje.findByPk(req.params.id)//no hay findById
    .then(viaje => res.render('viaje',{viaje}))
    .catch(error => console.log(error))
}