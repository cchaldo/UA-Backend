const httpStatus = require('http-status');
const Places = require('../models/places.model');
const {handler: errorHandler} = require('../middlewares/error');

exports.create = async (req, res, next) => {

    try {
        const placeObj = await new Places(req.body);
        placeObj.userId = req.user.id;
        
        const places = await placeObj.save();
        
        // console.log(httpStatus);
        res.status(httpStatus.OK);

        return res.json({places})
    }
    catch(error){
        return req.json(error);
    }
}


exports.view = async (req, res, next) => {

    try {

        const places = await Places.findById(req.params.id);

        res.status(httpStatus.OK);
        return res.json({
            success: true,
            places,
            'message': "Places View",
            
        });

    } catch (error) {
        
        return res.json(error);
    }
}

exports.index = async (req, res, next) => {
    try {

        const places = await Places.find().where({status: 1});

        res.status(httpStatus.OK);
        return res.json({

            success: true,
            places

        })

    } catch (error) {
        
        return res.json(error);

    }
}

exports.update = async (req, res, next) => {

    try{

        const places = await Places.update({_id : req.params.id}, req.body);

        res.status(httpStatus.OK);
        return res.json({

            success : true,
            places

        });

    }
    catch(error){

        return res.json(error);

    }

}

exports.delete = async (req, res, next) => {
    
    try {
        
        const places = await Places.update({_id: req.params.id}, {status: 0});
        
        res.status(httpStatus.OK);
        return res.json({
            success: true,
            'message': 'Deleted',
            places
        
        });
    } catch (error) {
        
        return res.json(error);
        
    }
}