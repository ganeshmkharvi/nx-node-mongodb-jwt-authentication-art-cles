import * as service from '../services/article';
import { Request, Response } from 'express';
import * as constants from "../utility/constants";

export async function addArticle(req, res){
    return await service.addArticle(req,res);
}

export async function getArticle(req, res){
    return await service.getArticle(req,res);
}

// deleting a article
export async function deleteArticle(req: Request, res: Response) {
    // get the article id from req.params
    const response = service.deleteArticle(req, res);
    return res.status(constants.statusCode200).json({
        message: response
    });
}
