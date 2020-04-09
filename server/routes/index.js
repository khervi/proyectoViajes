const express = require('express');
const router = express.Router();

// *** CONTROLADORES ***
const controlNosotros= require('../controllers/nosotrosController');
const controlHomePage = require('../controllers/homeController');
const controlViajes = require('../controllers/viajesController');
const controlTestimonial = require('../controllers/testimonialController')

module.exports = function(){
    router.get('/',controlHomePage.homePage);
    // ***********************************
    router.get('/nosotros',controlNosotros.infoNosotros);
    //buscar toodo de la base de datos 
    router.get('/viajes',controlViajes.mostrarViajes);
    //buscar viaje por id
    router.get('/viajes/:id',controlViajes.mostrarViaje);
    //para listar el testimonial
    router.get('/testimoniales',controlTestimonial.listarTestimonial);
    //para llenar el formulario testimonial
    router.post('/testimoniales',controlTestimonial.agregarTestimonial);

    return router;
}