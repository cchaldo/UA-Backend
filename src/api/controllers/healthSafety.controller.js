const httpStatus = require('http-status');
const HealthSafety = require('../models/healthSafety.model');
const { handler: errorHandler } = require('../middlewares/error');

exports.create = async (req, res, next) => {
    try {

        const healthSafetyObj = await new HealthSafety(req.body);
        
        const healthsafety = await healthSafetyObj.save()
        res.status(httpStatus.OK);
        return res.json({
            healthsafety,
            'message': "saved"
        });


    } catch (error) {
        return res.json(error);
    }
}

exports.index = async (req, res, next) => {
    try {
        
        const healthsafety = await HealthSafety.find().where();
        
        res.status(httpStatus.OK);
        
        return res.json({
            succuss: true,
            healthsafety,
        });

    } catch (error) {

        return res.json(error)

    }
}

exports.update = async (req, res, next) => {
    try {
        
        const healthsafety = await HealthSafety.update({_id: req.param.id}, req.body);

        res.status(httpStatus.OK);
        return res.json({
            healthsafety,
            'message': 'Done'
        })

    } catch (error) {
    
        return res.json(error)

    }
}

exports.delete = async (req, res, next) => {
    try {
        
        const healthsafety = await HealthSafety.update({_id: req.body.id}, {status: 0});

        res.status(httpStatus.OK);
        return res.json({
            succuss: true,
            'message' : 'Deleted'
        });

    } catch (error) {
        return res.json(error);
    }
}
exports.view = async (req, res, next) => {
    try {
        const healthsafety = await HealthSafety.findById(req.params.id);
        
        res.status(httpStatus.OK);
        return res.json({
            healthsafety,
            succuss: true
        })
    } catch (error) {
        return res.json(error);
    }
}