import {Opinion } from '../model/Opiniones.js';

const guardarOpinion = async (req,res) => {

    //Validar...formulario
    const{nombre,correo,mensaje} = req.body;

    const errores = [];

    if(nombre.trim() === ''){
        errores.push( { mensaje : 'El nombre esta vacio' } )
    }
    if(correo.trim() === ''){
        errores.push( { mensaje : 'El correo esta vacio' } )
    }
    if(mensaje.trim() === ''){
        errores.push( { mensaje : 'El mensaje esta vacio' } )
    }

    if(errores.length > 0) {
        //Consultar opiniones existentes
        const opiniones = await  Opinion.findAll();
        //Mostrar la vista con eerrores

        res.render('opiniones',{
            pagina: 'Opiniones',
            errores,
            nombre,
            correo,
            mensaje,
            opiniones
        })
    }else{
        //Almacenarlo en la base de datos
        try {
            await Opinion.create({
                nombre,
                correo,
                mensaje
            });

            res.redirect('/opiniones')
        } catch (error) {
            console.log(error)
        }
    }
}

export {
    guardarOpinion
}