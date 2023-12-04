const Usuario = require('../models/usuario');
const Cita = require('../models/cita');

const fs = require('fs');

const borrarImagen =  ( path ) => {


    if ( fs.existsSync( path ) ) {

        //Borrar la imagen anterior
        fs.unlinkSync( path );
    }



}


const actualizarImagen = async (tipo, id, nombreArchivo) => {

    let pathViejo = '';

    switch( tipo) {
        case 'citas':
            const cita = await Cita.findById(id);
            if( !cita ) {
                return false;
            }

            pathViejo = `./uploads/medicos/${ cita.img }`;
            borrarImagen( pathViejo );

            cita.img = nombreArchivo;
            await cita.save();

            return true;

        break;

        case 'usuarios':

            const usuario = await Usuario.findById(id);

            if( !usuario) {
                return false;
            }
        
            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen( pathViejo );

            usuario.img = nombreArchivo;
            await usuario.save();

            return true;

        break;


    }




}


module.exports = {
    actualizarImagen
}