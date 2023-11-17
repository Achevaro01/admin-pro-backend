const moongose = require('mongoose');


const dbConnection = async () => {

    try{

        await moongose.connect(process.env.DB_CNN, {

        });

        console.log('DB Online');

    } catch (error) {
        console.log(error);
        throw new error('Error a la horta de iniciar la BD ver logs')

    }



}
module.exports = {
    dbConnection
}

