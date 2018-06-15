const httpStatus = require('http-status');
const Execution = require('../models/execution.model');
const {handler: errorHandler} = require('../middlewares/error');

exports.create = async ( req, res, next ) => {

    try {

        const executionObj = await new Execution(req.body);

        const executions = await executionObj.save();

        res.status(httpStatus.OK);

        return res.json({
            executions,
            'message': 'Saved'
        })

    } catch (error) {
        return res.json(error)
    }

}

exports.index = async (req,res,next) => {
    try {
        const execution = await Execution.find().where({projectId : req.params.projectId});
        res.status(httpStatus.OK);
        return res.json({
            execution,
            success: true
        })
    } catch (error) { 
        return res.json(error)
    }
}

exports.update = async (req, res, next) => {
    try {
        const execution = await Execution.update({_id: req.params.id}, req.body);

        res.status(httpStatus.OK);

        return res.json({
            execution,
            success: true,
            'message': 'Updated'
        });
    } catch (error) {
        
    }
}

exports.delete = async (req, res, next) => {
    try {
        const execution = await Execution.update({_id: req.params.id}, {status: 0});

        res.status(httpStatus.OK);
        return res.json({
            execution,
            'message' : 'Deleted,'
        });
    } catch (error) {
        return res.json(error);
    }
}

exports.view = async (req, res, next) => {
    try {

        const execution = await Execution.findById(req.params.id);

        res.status(httpStatus.OK);
        return res.json({
            execution,
            success: true
        })
    } catch (error) {
        return res.json(error)
    }
}