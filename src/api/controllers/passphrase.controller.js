const httpStatus = require('http-status');
const Passphrase = require('../models/passphrase.model');
const {handler: errorHandler} = require('../middlewares/error');

exports.create = async (req,res,next) => {
    try {
        const passphrase = await (new Passphrase(req.body).save());

        res.status(httpStatus.OK);
        return res.json({
            passphrase,
            'message': 'Created'
        });

    } catch (error) {
        
        return res.json(error);

    }
}

exports.index = async (req,res,next) => {
    try {
        
        const passphrase = await Passphrase.find().where({status: 1});
        res.status(httpStatus.OK);

        return res.json({
            success: true,
            passphrase,
        })

    } catch (error) {
        res.json(error);
    }
}



exports.delete = async (req,res,next) => {
    try {
        const passphrase = await Passphrase.update({_id: req.params.id}, {status: 0});
        res.status(httpStatus.OK);

        return res.json({
            success: true,
            passphrase,
            'message' : 'Deleted'
        });

    } catch (error) {
        return res.json(error)
    }
}
