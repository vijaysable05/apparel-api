import { Router } from "express";
import { addOrder, checkAvailability, deleteOrder, getOrder, getOrders, updateOrder } from "./order.controller";
export const orderRouter = Router();

orderRouter.post('/add', addOrder);

orderRouter.get('/', getOrders);

orderRouter.get('/availability/:id', checkAvailability);

orderRouter.get('/:id', getOrder);

orderRouter.put('/:id', updateOrder);

orderRouter.delete('/:id', deleteOrder);

