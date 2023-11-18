import { Router } from "express";
import { addVendor, deleteVendor, getVendor, getVendors, updateVendor } from "./vendor.controller";
export const vendorRouter = Router();

vendorRouter.post('/add', addVendor);

vendorRouter.get('/', getVendors);

vendorRouter.get('/:id', getVendor);

vendorRouter.put('/:id', updateVendor);

vendorRouter.delete('/:id', deleteVendor);

