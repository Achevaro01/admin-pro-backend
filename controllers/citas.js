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

const actualizarCita = async ( req, res =  response ) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        
        const cita = await Cita.findById( id );

        if( !cita ) {

            return res.status(404).json({
                ok: false,
                msg: 'Cita no encontrada por id',
            });

        }

        const cambiosCita = {
            ...req.body,
            usuario: uid
        }

        const citaActualizada =  await Cita.findByIdAndUpdate( id, cambiosCita, { new: true  } );

        // cita.fecha = req.body.fecha;
        // cita.hora = req.body.hora;


        res.json({
            ok: true,
            msg: 'actualizarCita',
            cita: citaActualizada
        });
        
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        
    }



}

const borrarCita = async ( req, res =  response ) => {

    const id = req.params.id;

    try {
        
        const cita = await Cita.findById( id );

        if( !cita ) {

            return res.status(404).json({
                ok: false,
                msg: 'Cita no encontrada por id',
            });

        }

        await Cita.findByIdAndDelete( id );


        res.json({
            ok: true,
            msg: 'Cita eliminada',
        });
        
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        
    }

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