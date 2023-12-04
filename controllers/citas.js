const { response } = require('express');

const Cita = require('../models/cita');

const getCitas = async( req, res =  response ) => {

    const citas = await Cita.find()
                            .populate('usuario', 'nombre');

    res.json({
        ok: true,
        citas
    });

}

const crearCita = async ( req, res =  response ) => {


    const uid = req.uid;
    const { fecha, hora } = req.body;
    
    // Verificar si hay citas existentes con la misma fecha y hora
    const citaExistente = await Cita.findOne({ fecha, hora });

    if (citaExistente) {
        return res.status(400).json({
            ok: false,
            msg: 'Ya existe una cita en esa fecha y hora',
        });
    }

    // Crear la nueva cita
    const cita = new Cita({
        usuario: uid,
        ...req.body,
    });

    try {

       const citaDB = await cita.save();

        res.json({
            ok: true,
            cita: citaDB
        });
        
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }



}

const actualizarCita = ( req, res =  response ) => {

    res.json({
        ok: true,
        msg: 'actualizarCita'
    });

}

const borrarCita = ( req, res =  response ) => {

    res.json({
        ok: true,
        msg: 'borrarCita'
    });

}

module.exports = {
    getCitas,
    crearCita,
    actualizarCita,
    borrarCita
}