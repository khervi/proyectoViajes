const Testimonial= require('../models/Testimoniales');

exports.listarTestimonial = (req,res)=>{
    Testimonial.findAll()
        .then(testimoniales => res.render('testimoniales',{pagina: 'Testimoniales',testimoniales}))  
        .catch(error => console.log(error))      

}

exports.agregarTestimonial = (req,res)=>{
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

}