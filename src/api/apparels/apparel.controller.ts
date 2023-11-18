import { Request, Response } from "express";
import { apparelSchema, multipleApparelUpdate } from "./apparel.schema";
import { StatusCodes } from "http-status-codes";
import { addApparelSrv, deleteApparelSrv, getApparelSrv, getApparelsSrv, updateApparelQtyAndPriceSrv, updateApparelSrv, updateMultipleApparelQtyAndPriceSrv } from "./apparel.service";

export const addApparel = async (req: Request, res: Response) => {
    try {
        const { error, value } = apparelSchema.validate(req.body);
        if (error) return res.status(StatusCodes.BAD_REQUEST).send({message: error.message});
        const apparel = await addApparelSrv(req.body);
        return res.status(StatusCodes.CREATED).send({ apparel: apparel });
    } catch (err: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
    }
}

export const getApparels = async (req: Request, res: Response) => {
    try {
        const apparels = getApparelsSrv();
        return res.status(StatusCodes.OK).send({ apparels: apparels });
    } catch (err: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
    }
}

export const getApparel = async (req: Request, res: Response) => {
    try {
        if (!req.params.id) return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Apparel code required' });
        const apparel = getApparelSrv(req.params.id);
        return res.status(StatusCodes.OK).send({ apparel: apparel });
    } catch (err: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
    }
}

export const updateApparel = async (req: Request, res: Response) => {
    try {
        if (!req.params.id || !req.body) return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Apparel id and body is required' })
        const updatedApparel = await updateApparelSrv(req.params.id, req.body);
        return res.status(StatusCodes.OK).send({ apparel: updatedApparel });
    } catch (err: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
    }
}

export const updateApparelQtyAndPrice = async (req: Request, res: Response) => {
    try {
        if (!req.params.id || !req.params.size || !req.body) return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Apparel id, size and body is required' })
        const updatedApparel = await updateApparelQtyAndPriceSrv(req.params.id, req.params.size, req.body);
        return res.status(StatusCodes.OK).send({ apparel: updatedApparel });
    } catch (err: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
    }
}

export const updateMultipleApparelQtyAndPrice = async (req: Request, res: Response) => {
    try {
        const { error, value } = multipleApparelUpdate.validate(req.body);
        if (error) return res.status(StatusCodes.BAD_REQUEST).send({message: error.message});;
        const updatedApparel = await updateMultipleApparelQtyAndPriceSrv(req.body);
        return res.status(StatusCodes.OK).send({ apparel: updatedApparel });
    } catch (err: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
    }
}

export const deleteApparel = async (req: Request, res: Response) => {
    try {
        if (!req.params.id) return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Apparel id required' });
        const deletedApparel = await deleteApparelSrv(req.params.id);
        if (deletedApparel) return res.status(StatusCodes.OK).send({ message: 'deleted successfully' });
        return res.status(StatusCodes.NOT_MODIFIED);
    } catch (err: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
    }
}