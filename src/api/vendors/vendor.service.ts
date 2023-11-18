import { Vendor } from "./vendor.interface";
import * as fs from 'fs/promises';
import * as fsSync from 'fs';
import { v4 as uuidv4 } from 'uuid';
import '../../db/vendors.json';
import path from 'path';

export const addVendorSrv = async (data: Vendor): Promise<Vendor> => {
    const vendors = getVendors();
    const vendorObj = {
        ...data,
        id: uuidv4(),
        apparels: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
    vendors.push(vendorObj);
    await fs.writeFile(path.resolve(__dirname, '../../db/vendors.json'), JSON.stringify(vendors))
    return vendorObj;
}

export const getVendorsSrv = (): Vendor[] => {
    return getVendors();
}

export const getVendorSrv = (id: string): Vendor | null => {
    const vendors = getVendors();
    const vendor = vendors.find((item: Vendor) => item.id === id);
    if (vendor) return vendor;
    return null;
}

export const updateVendorSrv = async (id: string, data: any): Promise<Vendor> => {
    const vendors = getVendors();
    const vendorIdx = vendors.findIndex((item: Vendor) => item.id === id);
    const vendorObj = {
        ...vendors[vendorIdx],
        ...data,
        updatedAt: new Date().toISOString()
    }
    vendors.splice(vendorIdx, 1, vendorObj);
    await fs.writeFile(path.resolve(__dirname, '../../db/vendors.json'), JSON.stringify(vendors))
    return vendorObj;
}

export const deleteVendorSrv = async (id: string): Promise<Boolean> => {
    const vendors = getVendors();
    const vendorIdx = vendors.findIndex((item: Vendor) => item.id === id);
    vendors.splice(vendorIdx, 1);
    await fs.writeFile(path.resolve(__dirname, '../../db/vendors.json'), JSON.stringify(vendors))
    return true;
}

export const getVendors = () => {
    const jsonData = fsSync.readFileSync(path.resolve(__dirname, '../../db/vendors.json'), 'utf-8');
    return jsonData ? JSON.parse(jsonData) : [];
}