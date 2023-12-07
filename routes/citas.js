/*

    Citas
    rutas: '/api/citas'

*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getCitas,
    crearCita,
    actualizarCita,
    borrarCita
} = require('../controllers/citas');


const router = Router();

router.get('/', getCitas );

router.post('/', 
    [
        validarJWT,
        check('motivoCita', 'El motivo de la cita es necesario').not().isEmpty(),
        check('fecha', 'La fecha es necesaria').not().isEmpty(),
        check('hora', 'La hora es necesaria').not().isEmpty(),
        validarCampos
    ],
    crearCita 
);

router.put('/:id', 
    [
        validarJWT,
        check('fecha', 'La fecha es necesaria').not().isEmpty(),
        check('hora', 'La hora es necesaria').not().isEmpty(),
        validarCampos,
    ], 
    actualizarCita 
);

router.delete('/:id', 

    validarJWT,
    borrarCita
);


module.exports = router;