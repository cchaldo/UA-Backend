const httpStatus = require('http-status');
const Communication = require('../models/communication.model');
const {handler: errorHandler} = require('../middlewares/error');

exports.create = async (req, res, next) => {
    try {   
        const communicationObj = await new Communication(req.body);
        
        const communication = await communicationObj.save()
        res.status(httpStatus.OK);
        return res.json({
            communication,
            'message' : "saved"
        });


    } catch (error) {
        return res.json(error);
    }
}