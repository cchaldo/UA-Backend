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

exports.index = async (req, res, next) => {
    try {
        const communication = await Communication.find().where();
        console.log(communication);
        res.status(httpStatus.OK);
        return res.json({
            success: true,
            communication
        });
    }
    catch (error) {
        return res.json(error);
    }

}

exports.update = async (req, res, next) => {
    try {
        const communication = await Communication.update({ _id: req.params.id }, req.body);

        res.status(httpStatus.OK);
        return res.json({
            success: true,
            communication
        });
    }
    catch (error) {
        return res.json(error);
    }
}

exports.view = async (req, res, next) => {
    try {

        const communication = await Communication.findById(req.params.id);
        res.status(httpStatus.OK);
        return res.json({
            communication,
            success: true,

        })
    } catch (error) {
        return res.json(error)
    }
}

exports.delete = async (req,res,next) => {
    try {

        const communication = await Communication.delete({_id: req.perams.id}, {status: 0})

        res.status(httpStatus.OK);
        return res.json({
            communication,
            success: true,
            'message': 'deleted'
        });

    } catch (error) {
        return res.json(error)
    }
} 