const Viaje = require('../models/Viajes');

exports.mostrarViajes = async (req,res)=>{
    // res.render('viajes',{pagina:'Proximos viajes'});
    const viajes = await Viaje.findAll()
    res.render('viajes',{
        pagina:'Proximos Viajes Khervi ofrece',
        viajes //object literal ---> viajes:viajes y queda
    })
 }

 exports.mostrarViaje =  async (req,res)=>{
    const viaje= await Viaje.findByPk(req.params.id)//no hay findById
    res.render('viaje',{ viaje })
}