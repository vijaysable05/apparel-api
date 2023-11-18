import { Customer } from "./customer.interface";
import * as fs from 'fs/promises';
import * as fsSync from 'fs';
import { v4 as uuidv4 } from 'uuid';
import '../../db/customers.json';
import path from 'path';

export const addCustomerSrv = async (data: Customer): Promise<Customer> => {
    const customers = getCustomers();
    const customerObj = {
        ...data,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
    customers.push(customerObj);
    await fs.writeFile(path.resolve(__dirname, '../../db/customers.json'), JSON.stringify(customers))
    return customerObj;
}

export const getCustomersSrv = (): Customer[] => {
    return getCustomers();
}

export const getCustomerSrv = (id: string): Customer | null => {
    const customers = getCustomers();
    const customer = customers.find((item: Customer) => item.id === id);
    if (customer) return customer;
    return null;
}

export const updateCustomerSrv = async (id: string, data: any): Promise<Customer> => {
    const customers = getCustomers();
    const customerIdx = customers.findIndex((item: Customer) => item.id === id);
    const customerObj = {
        ...customers[customerIdx],
        ...data,
        updatedAt: new Date().toISOString()
    }
    customers.splice(customerIdx, 1, customerObj);
    await fs.writeFile(path.resolve(__dirname, '../../db/customers.json'), JSON.stringify(customers))
    return customerObj;
}

export const deleteCustomerSrv = async (id: string): Promise<Boolean> => {
    const customers = getCustomers();
    const customerIdx = customers.findIndex((item: Customer) => item.id === id);
    customers.splice(customerIdx, 1);
    await fs.writeFile(path.resolve(__dirname, '../../db/customers.json'), JSON.stringify(customers))
    return true;
}

export const getCustomers = () => {
    const jsonData = fsSync.readFileSync(path.resolve(__dirname, '../../db/customers.json'), 'utf-8');
    return jsonData ? JSON.parse(jsonData) : [];
}