const httpStatus = require('http-status');
const Documents = require('../models/documentation.model');
const {handler: errorHandler} = require('../middlewares/error');

exports.create = async (req,res,next) => {
    try {
        req.body.attachments = req.body.attachedFiles;
        req.body.attachedFiles = null;

        const obj = await (new Documents(req.body));
        const docs = await (obj.save());
        

        res.status(httpStatus.OK);
        return res.json({
            docs,
            'message': 'Created'
        });

    } catch (error) {
        
        return res.json(error);

    }
}

exports.index = async (req,res,next) => {
    try {
        
        const document = await Documents.find().where({ projectId: req.params.projectId });
        res.status(httpStatus.OK);

        return res.json({
            success: true,
            document,
        })

    } catch (error) {
        res.json(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        
        const document = await Documents.update({_id: req.params.id}, req.body);

        res.status(httpStatus.OK);

        return res.json({
            success: true,
            document,
            'message' : 'Updated'
        })

    } catch (error) {
        
        return res.json(error)

    }
}

exports.delete = async (req,res,next) => {
    try {
        const document = await Documents.update({_id: req.params.id}, {status: 0});
        res.status(httpStatus.OK);

        return res.json({
            success: true,
            document,
            'message' : 'Deleted'
        });

    } catch (error) {
        return res.json(error)
    }
}

exports.view = async (req,res,next) => {
    try {
        
        const document = await Documents.findById(req.params.id);

        res.status(httpStatus.OK);

        return res.json({
            document,
            success: true            
        })

    } catch (error) {
        return res.json(error);
    }
}