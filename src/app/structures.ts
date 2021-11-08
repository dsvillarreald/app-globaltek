import { DataSource } from "@angular/cdk/collections";

export interface Menu {
    route: String;
    action: string;
    name: string;
    type: string;
    icon: string;
}

export interface Detail {
    item: number;
    product: string;
    amount: number;
    unitPrice: number;
    totalPrice: number;
}

export interface DataSet {
    id: number;
    billNumber: number;
    date: Date;
    paymentType: string;
    detail: Array<Detail>;
    clientDocument: number;
    clientName: string;
    discount: number;
    iva: number;
    billTotal: number;
    billTotalIva: number;
}

export interface DetailProducts {
    item: number;
    product: string;
    amount: number;
    unitPrice: number;
    totalPrice: number;
    editable: boolean;
}
