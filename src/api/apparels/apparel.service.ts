import { Apparel, ApparelSize, UpdateApparelObj } from "./apparel.interface";
import * as fs from 'fs/promises';
import * as fsSync from 'fs';
import { v4 as uuidv4 } from 'uuid';
import '../../db/apparels.json';
import path from 'path';

export const addApparelSrv = async (data: Apparel): Promise<Apparel> => {
    const apparels = getApparels();
    const apparelObj = {
        ...data,
        code: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
    apparels.push(apparelObj);
    await fs.writeFile(path.resolve(__dirname, '../../db/apparels.json'), JSON.stringify(apparels))
    return apparelObj;
}

export const getApparelsSrv = (): Apparel[] => {
    return getApparels();
}

export const getApparelSrv = (code: string): Apparel | null => {
    const apparels = getApparels();
    const apparel = apparels.find((item: Apparel) => item.code === code);
    if (apparel) return apparel;
    return null;
}

export const updateApparelSrv = async (code: string, data: any): Promise<Apparel> => {
    const apparels = getApparels();
    const apparelIdx = apparels.findIndex((item: Apparel) => item.code === code);
    const apparelObj = {
        ...apparels[apparelIdx],
        ...data,
        updatedAt: new Date().toISOString()
    }
    apparels.splice(apparelIdx, 1, apparelObj);
    await fs.writeFile(path.resolve(__dirname, '../../db/apparels.json'), JSON.stringify(apparels))
    return apparelObj;
}

export const updateApparelQtyAndPriceSrv = async (code: string, size: string, data: any): Promise<Apparel> => {
    const apparels = getApparels();
    const apparel = updateApparelQtyAndPriceHelper(code, size, data);
    await fs.writeFile(path.resolve(__dirname, '../../db/apparels.json'), JSON.stringify(apparels))
    return apparel;
}

export const updateMultipleApparelQtyAndPriceSrv = async (data: UpdateApparelObj[]): Promise<Apparel[]> => {
    const apparels = getApparels();
    let updatedApparels: Apparel[] = []
    data.forEach((item: UpdateApparelObj) => {
        const apparel = updateApparelQtyAndPriceHelper(item.code, item.size, item.updateData);
        updatedApparels.push(apparel)
    });
    await fs.writeFile(path.resolve(__dirname, '../../db/apparels.json'), JSON.stringify(apparels))
    return updatedApparels;
}

export const deleteApparelSrv = async (code: string): Promise<Boolean> => {
    const apparels = getApparels();
    const apparelIdx = apparels.findIndex((item: Apparel) => item.code === code);
    apparels.splice(apparelIdx, 1);
    await fs.writeFile(path.resolve(__dirname, '../../db/apparels.json'), JSON.stringify(apparels))
    return true;
}

export const updateApparelQtyAndPriceHelper = (code: string, size: string, data: any): Apparel => {
    const apparels = getApparels();
    const apparelIdx = apparels.findIndex((item: Apparel) => item.code === code);
    const sizeIdx = apparels[apparelIdx].sizes.findIndex((item: ApparelSize) => item.size === size);
    const apparelSizeObj = {
        ...apparels[apparelIdx].sizes[sizeIdx],
        ...data
    }
    apparels.splice(apparelIdx, 1, {...apparels[apparelIdx], updatedAt: new Date().toISOString()});
    apparels[apparelIdx].sizes.splice(sizeIdx, 1, apparelSizeObj);
    return apparels[apparelIdx];
}

export const getApparels = () => {
    const jsonData = fsSync.readFileSync(path.resolve(__dirname, '../../db/apparels.json'), 'utf-8');
    return jsonData ? JSON.parse(jsonData) : [];
}
