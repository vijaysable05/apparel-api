import { Router } from "express";
import { addCustomer, deleteCustomer, getCustomer, getCustomers, updateCustomer } from "./customer.controller";
export const customerRouter = Router();

customerRouter.post('/add', addCustomer);

customerRouter.get('/', getCustomers);

customerRouter.get('/:id', getCustomer);

customerRouter.put('/:id', updateCustomer);

customerRouter.delete('/:id', deleteCustomer);
