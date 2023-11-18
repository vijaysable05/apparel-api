import { Request, Response } from "express";
import { orderSchema } from "./order.schema";
import { StatusCodes } from "http-status-codes";
import { addOrderSrv, checkAvailabilityForOrder, deleteOrderSrv, getOrderSrv, getOrdersSrv, updateOrderSrv } from "./order.service";

export const addOrder = async (req: Request, res: Response) => {
    try {
        const { error, value } = orderSchema.validate(req.body);
        if (error) return res.status(StatusCodes.BAD_REQUEST).send({message: error.message});
        const order = await addOrderSrv(value);
        return res.status(StatusCodes.CREATED).send({order: order});
    } catch (err: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
    }
}

export const checkAvailability = (req: Request, res: Response) => {
    try {
        if (!req.params.id) return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Order id required' });
        const availability = checkAvailabilityForOrder(req.params.id);
        return res.status(StatusCodes.OK).send({availability: availability});
    } catch (err: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
    }
}

export const getOrders = (req: Request, res: Response) => {
    try {
        const orders = getOrdersSrv();
        return res.status(StatusCodes.OK).send({orders: orders});
    } catch (err: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
    }
}

export const getOrder = (req: Request, res: Response) => {
    try {
        if (!req.params.id) return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Order id required' });
        const order = getOrderSrv(req.params.id);
        return res.status(StatusCodes.OK).send({order: order});
    } catch (err: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
    }
}

export const updateOrder = async (req: Request, res: Response) => {
    try {
        if (!req.params.id || !req.body) return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Order id and body is required' })
        const updatedOrder = await updateOrderSrv(req.params.id, req.body);
        return res.status(StatusCodes.OK).send({order: updatedOrder});
    } catch (err: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
    }
}

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        if (!req.params.id) return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Order id required' });
        const deleteOrder = await deleteOrderSrv(req.params.id);
        if (deleteOrder) return res.status(StatusCodes.OK).send({message: 'deleted successfully'});
        return res.status(StatusCodes.NOT_MODIFIED);
    } catch (err: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
    }
}