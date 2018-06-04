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