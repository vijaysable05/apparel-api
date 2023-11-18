import { Request, Response } from "express";
import { customerSchema } from "./customer.schema";
import { StatusCodes } from "http-status-codes";
import { addCustomerSrv, deleteCustomerSrv, getCustomerSrv, getCustomersSrv, updateCustomerSrv } from "./customer.service";

export const addCustomer = async (req: Request, res: Response) => {
    try {
        const { error, value } = customerSchema.validate(req.body);
        if (error) return res.status(StatusCodes.BAD_REQUEST).send({message: error.message});
        const customer = await addCustomerSrv(value);
        return res.status(StatusCodes.CREATED).send({ customer: customer });
    } catch (err: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
    }
}

export const getCustomers = async (req: Request, res: Response) => {
    try {
        const customers = getCustomersSrv();
        return res.status(StatusCodes.OK).send({ customers: customers });
    } catch (err: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
    }
}

export const getCustomer = async (req: Request, res: Response) => {
    try {
        if (!req.params.id) return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Customer id required' });
        const customer = getCustomerSrv(req.params.id);
        return res.status(StatusCodes.OK).send({ customer: customer });
    } catch (err: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
    }
}

export const updateCustomer = async (req: Request, res: Response) => {
    try {
        if (!req.params.id || !req.body) return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Customer id and body is required' })
        const updatedCustomer = await updateCustomerSrv(req.params.id, req.body);
        return res.status(StatusCodes.OK).send({ customer: updatedCustomer });
    } catch (err: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
    }
}

export const deleteCustomer = async (req: Request, res: Response) => {
    try {
        if (!req.params.id) return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Customer id required' });
        const deletedCustomer = await deleteCustomerSrv(req.params.id);
        if (deletedCustomer) return res.status(StatusCodes.OK).send({ message: 'deleted successfully' });
        return res.status(StatusCodes.NOT_MODIFIED);
    } catch (err: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
    }
}