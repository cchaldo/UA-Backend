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