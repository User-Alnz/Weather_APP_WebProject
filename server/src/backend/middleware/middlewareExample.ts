import type { RequestHandler } from "express";
import BadRequestError from "../errors/badRequestErrors.js";

const AsyncRead : RequestHandler = async (req, res, next) => {

    try {

        const {id} = req.body;

        // 
        if(!id)
        return next(new BadRequestError({code: 400, message: "Name is required!", logging: true}));

       //Add await other function() or async middleware here !

       res.status(202).json({ 
            success : true, 
            message : "Request done"
        });

    } catch (err) {
        //Pass the error to errorHandler.
      next(err);
    }

};

//Sync for faster answer and if no other midleware, controllers or other function needed
const SyncRead : RequestHandler = (req, res, next) => {

    const {name} = req.query;

    if(!name)
    return next(new BadRequestError({code: 400, message: "Name is required!", logging: true}));

    const newUser = { id:  1, name,};

    res.status(201).send({ data: newUser });
}

export default {AsyncRead, SyncRead};