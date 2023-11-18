export interface Apparel {
    name: string;
    code: string;
    createdAt: string;
    updatedAt: string;
    vendor: string;
    sizes: ApparelSize[];
}

export interface ApparelSize {
    size: string;
    quantity: number;
    sellingPrice: number;
    minPrice: number;
}

export enum Size {
    small = 's',
    medium = 'm',
    large = 'l',
    extraLarge = 'xl',
    extraExtraLarge = 'xxl'
}

export interface UpdateApparelObj {
    code: string;
    size: string;
    updateData: {
        quantity?: number;
        sellingPrice?: number;
        minPrice?: number;
    };
}
