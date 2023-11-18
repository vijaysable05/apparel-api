
export interface Order {
    id: string;
    customer: string;
    items: OrderItems[];
    totalSellingPrice: number;
    totalMinPrice: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface OrderItems {
    apparel: string;
    size: string;
    quantity: number;
}

export interface Availability {
    apparel: string;
    size: string;
    quantity: number;
    status: string;
    availableQuantity: number;
}
