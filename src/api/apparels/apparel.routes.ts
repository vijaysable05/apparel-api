import { Router } from "express";
import { addApparel, deleteApparel, getApparel, getApparels, updateApparel, updateApparelQtyAndPrice, updateMultipleApparelQtyAndPrice } from "./apparel.controller";
export const apparelRouter = Router();

apparelRouter.post('/add', addApparel);

apparelRouter.get('/', getApparels);

apparelRouter.get('/:id', getApparel);

apparelRouter.put('/qtyandprice/multiple', updateMultipleApparelQtyAndPrice);

apparelRouter.put('/qtyandprice/:id/:size', updateApparelQtyAndPrice);

apparelRouter.put('/:id', updateApparel);

apparelRouter.delete('/:id', deleteApparel);

