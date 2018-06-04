const httpStatus = require('http-status');
const Communication = require('../models/communication.model');
const {handler: errorHandler} = require('../middlewares/error');

exports.create = async (req, res, next) => {
    try {
        
        const communicationObj = await new Communication(req.body);
        req.body.moc.map((items) => {
            communicationObj.moc.push(items)
        })
        
        const moc = await communicationObj.save()
        res.status(httpStatus.OK);
        return res.json({
            communication,
            'message' : "saved"
        });


    } catch (error) {
        return res.json(error);
    }
}