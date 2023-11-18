import { Request, Response } from "express";
import { vendorSchema } from "./vendor.schema";
import { StatusCodes } from "http-status-codes";
import { addVendorSrv, deleteVendorSrv, getVendorSrv, getVendorsSrv, updateVendorSrv } from "./vendor.service";

export const addVendor = async (req: Request, res: Response) => {
    try {
        const { error, value } = vendorSchema.validate(req.body);
        if (error) return res.status(StatusCodes.BAD_REQUEST).send({message: error.message});
        const vendor = await addVendorSrv(value);
        return res.status(StatusCodes.CREATED).send({vendor: vendor});
    } catch (err: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
    }
}

export const getVendors = (req: Request, res: Response) => {
    try {
        const vendors = getVendorsSrv();
        return res.status(StatusCodes.OK).send({vendors: vendors});
    } catch (err: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
    }
}

export const getVendor = (req: Request, res: Response) => {
    try {
        if (!req.params.id) return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Vendor id required' });
        const vendor = getVendorSrv(req.params.id);
        return res.status(StatusCodes.OK).send({vendor: vendor});
    } catch (err: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
    }
}

export const updateVendor = async (req: Request, res: Response) => {
    try {
        if (!req.params.id || !req.body) return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Vendor id and body is required' })
        const updatedVendor = await updateVendorSrv(req.params.id, req.body);
        return res.status(StatusCodes.OK).send({vendor: updatedVendor});
    } catch (err: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
    }
}

export const deleteVendor = async (req: Request, res: Response) => {
    try {
        if (!req.params.id) return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Vendor id required' });
        const deletedVendor = await deleteVendorSrv(req.params.id);
        if (deletedVendor) return res.status(StatusCodes.OK).send({message: 'deleted successfully'});
        return res.status(StatusCodes.NOT_MODIFIED);
    } catch (err: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
    }
}