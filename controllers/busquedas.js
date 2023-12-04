const { response } = require('express');

const Usuario = require('../models/usuario');
const Cita = require('../models/cita');




const getTodo = async ( req, resp = response ) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i');

    const [usuarios, citas] = await Promise.all([

        Usuario.find({ nombre: regex }),
        Cita.find( { motivoCita: regex }),

    ]);

    resp.json({
        ok: true,
        usuarios,
        citas
    })

}

const getDocumentosColeccion = async ( req, resp = response ) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i');

    let data = [];


    switch( tabla ) {
        case 'citas':
            data = await Cita.find({ motivoCita: regex })
                             .populate('usuario', 'nombre img');
        break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });

        break;

        default:
            return resp.status(400).json({
                ok: false,
                msg: 'la tabla tiene que ser usuarios/citas'
            });
    }

    resp.json({
        ok: true,
        resultados: data
    });

}




module.exports = {
    getTodo,
    getDocumentosColeccion
}