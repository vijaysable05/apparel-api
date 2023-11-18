import { Availability, Order, OrderItems } from "./order.interface";
import * as fs from 'fs/promises';
import * as fsSync from 'fs';
import { v4 as uuidv4 } from 'uuid';
import '../../db/orders.json';
import path from 'path';
import { Apparel, ApparelSize } from "../apparels/apparel.interface";
import { getApparels } from "../apparels/apparel.service";

export const addOrderSrv = async (data: Order): Promise<Order> => {
    const orders = getOrders();
    const { totalMinPrice, totalSellingPrice } = calculateTotalSellingAndMinPrice(data.items);
    const orderObj = {
        ...data,
        id: uuidv4(),
        totalMinPrice: totalMinPrice,
        totalSellingPrice: totalSellingPrice,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
    orders.push(orderObj);
    await fs.writeFile(path.resolve(__dirname, '../../db/orders.json'), JSON.stringify(orders))
    return orderObj;
}

export const checkAvailabilityForOrder = (id: string): Availability[] | null => {
    const orders = getOrders();
    const apparels = getApparels();
    const order = orders.find((item: Order) => item.id === id);
    if (!order) return null;
    let availObjs: Availability[] = [];
    order.items.forEach((item: OrderItems) => {
        const apparel = apparels.find((app: Apparel) => app.code === item.apparel);
        if (apparel) {
            const sizeObj = apparel.sizes.find((size: ApparelSize) => size.size === item.size);
            if (sizeObj) {
                if (sizeObj.quantity < item.quantity) {
                    availObjs.push({ ...item, status: 'quantity not available', availableQuantity: sizeObj.quantity })
                } else {
                    availObjs.push({ ...item, status: 'quantity available', availableQuantity: sizeObj.quantity })
                }
            } else {
                availObjs.push({ ...item, status: 'size not available', availableQuantity: 0 })
            }
        } else {
            availObjs.push({ ...item, status: 'apparel not available', availableQuantity: 0 })
        }
    })
    return availObjs;
}

export const getOrdersSrv = (): Order[] => {
    return getOrders();
}

export const getOrderSrv = (id: string): Order | null => {
    const orders = getOrders();
    const order = orders.find((item: Order) => item.id === id);
    if (order) return order;
    return null;
}

export const updateOrderSrv = async (id: string, data: any): Promise<Order> => {
    const orders = getOrders();
    const orderIdx = orders.findIndex((item: Order) => item.id === id);
    if (data.status && data.status === 'approved') {
        await updateApparelQty(orders[orderIdx]);
    }
    const orderObj = {
        ...orders[orderIdx],
        ...data,
        updatedAt: new Date().toISOString()
    }
    orders.splice(orderIdx, 1, orderObj);
    await fs.writeFile(path.resolve(__dirname, '../../db/orders.json'), JSON.stringify(orders))
    return orderObj;
}

export const deleteOrderSrv = async (id: string): Promise<Boolean> => {
    const orders = getOrders();
    const orderIdx = orders.findIndex((item: Order) => item.id === id);
    orders.splice(orderIdx, 1);
    await fs.writeFile(path.resolve(__dirname, '../../db/orders.json'), JSON.stringify(orders))
    return true;
}

export const updateApparelQty = async (order: Order): Promise<any> => {
    const apparels = getApparels();
    order.items.forEach((app: OrderItems) => {
        const apparelIdx = apparels.findIndex((item: Apparel) => item.code === app.apparel);
        const sizeIdx = apparels[apparelIdx].sizes.findIndex((item: ApparelSize) => item.size === app.size);
        const qty = apparels[apparelIdx].sizes[sizeIdx].quantity - app.quantity;
        const apparelSizeObj = {
            ...apparels[apparelIdx].sizes[sizeIdx],
            quantity: qty,
            updatedAt: new Date().toISOString()
        }
        apparels[apparelIdx].sizes.splice(sizeIdx, 1, apparelSizeObj);
    })
    await fs.writeFile(path.resolve(__dirname, '../../db/apparels.json'), JSON.stringify(apparels))
}

export const calculateTotalSellingAndMinPrice = (items: OrderItems[]): { totalSellingPrice: number; totalMinPrice: number } => {
    const apparels = getApparels();
    let totalSellingPrice = 0;
    let totalMinPrice = 0;
    items.forEach((item: OrderItems) => {
        const apparel = apparels.find((app: Apparel) => app.code === item.apparel);
        if (apparel) {
            const sizeObj = apparel.sizes.find((size: ApparelSize) => size.size === item.size);
            if (sizeObj) {
                totalSellingPrice = totalSellingPrice + (item.quantity * sizeObj.sellingPrice);
                totalMinPrice = totalMinPrice + (item.quantity * sizeObj.minPrice);
            }
        }
    })
    return {
        totalSellingPrice,
        totalMinPrice
    }
}

export const getOrders = () => {
    const jsonData = fsSync.readFileSync(path.resolve(__dirname, '../../db/orders.json'), 'utf-8');
    return jsonData ? JSON.parse(jsonData) : [];
}
