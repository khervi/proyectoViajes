const Testimonial= require('../models/Testimoniales');

exports.listarTestimonial = async (req,res)=>{
    const testimoniales = await Testimonial.findAll()
    res.render('testimoniales',{ pagina:'Testimoniales', testimoniales })     

}

exports.agregarTestimonial = async (req,res)=>{
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
        const testimoniales = await Testimonial.findAll()
        res.render('testimoniales',{ //al renderear mandar la vista , seguido del obj {nombre:nombre}= {nombre}
            errores,
            nombre,
            correo,
            mensaje,
            pagina:'Testimoniales',
            testimoniales
        })
    } else {
        //almacenar a la base de datos  --- CREAR
       Testimonial.create({ nombre,correo,mensaje })
       .then(testimonial => res.redirect('/testimoniales'))
       .catch(error => console.log(error));

    }

}