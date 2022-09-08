import { Viaje } from '../model/Viaje.js';
import { Opinion } from '../model/Opiniones.js';

const paginaInicio = async (req,res)=>{ //req- lo que enviamos : res- lo que express nos responde

    //Consultar 3 viajes del modelo viaje

    const promiseDB = [];
    promiseDB.push(Viaje.findAll({limit: 4}));
    promiseDB.push(Opinion.findAll({limit: 4}));

    try {
        const resultado = await Promise.all(promiseDB);
        res.render('inicio',{
            pagina: 'Inicio',
            clase : 'home',
            viajes: resultado[0],
            opiniones: resultado[1]
            
    })      //res.json(archivo json) o res.render(vista)

    } catch (error) {
        console.log(error)
    }


}

const paginaNosotros = (req,res)=>{ //req- lo que enviamos : res- lo que express nos responde
    res.render('nosotros',{
        pagina: 'Nosotros'
    });   //res.send('Nosotros')//res.json(archivo json) o res.render(vista)
}

const paginaViajes = async (req,res)=>{ //req- lo que enviamos : res- lo que express nos responde
    //consultar la base de datos para pasarle el resultado hacia la vista 
    const viajes = await Viaje.findAll();
    
    res.render('viajes',{
        pagina: 'Próximos Viajes',
        viajes
    })   //res.send('Nosotros')//res.json(archivo json) o res.render(vista)
}

const paginaOpiniones = async (req,res)=>{ //req- lo que enviamos : res- lo que express nos responde
    try {
        const opiniones = await  Opinion.findAll();
        res.render('opiniones',{
            pagina: 'Opiniones',
            opiniones
    }) 
    } catch (error) {
        console.log(error)
    }
  //res.send('Nosotros')//res.json(archivo json) o res.render(vista)
}

//Muestra un viaje por su slug
const paginaDetalleViaje = async (req,res)=>{

    const {slug} = req.params;

    try {
        const viaje = await Viaje.findOne({where:{slug}});
        res.render('viaje',{
            pagina: 'Información Viaje',
            viaje
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaOpiniones,
    paginaDetalleViaje
}