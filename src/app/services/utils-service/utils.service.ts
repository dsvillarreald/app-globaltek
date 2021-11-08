import { Injectable } from '@angular/core';
import { DataSet, Detail } from '../../structures';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  transformDataTable(data: any): Array<DataSet> {
    let dataResult: Array<DataSet> = [];
    data.forEach((element: any) => {
      const elementDataTable: DataSet = {
        id: element['id'],
        billNumber: element['NumeroFactura'],
        date: element['Fecha'],
        paymentType: element['TipodePago'],
        detail: this.transformDetails(element['Detalle']),
        clientDocument: element['DocumentoCliente'],
        clientName: element['NombreCliente'],
        discount: element['Descuento'],
        iva: element['IVA'],
        billTotal: 0,
        billTotalIva: 0
      }
      const total = this.calculeTotalBill(elementDataTable['detail']);
      elementDataTable['billTotal'] = Number(this.calculeDecimal(elementDataTable['discount'], total, 'discount'));
      elementDataTable['billTotalIva'] = Number(this.calculeDecimal(elementDataTable['iva'], elementDataTable['billTotal'], 'iva'));

      dataResult.push(elementDataTable);
    });
    
    return dataResult;
  }

  transformReviewBill(data: any): DataSet {
      const elementDataTable: DataSet = {
        id: data['id'],
        billNumber: data['NumeroFactura'],
        date: data['Fecha'],
        paymentType: data['TipodePago'],
        detail: this.transformDetails(data['Detalle']),
        clientDocument: data['DocumentoCliente'],
        clientName: data['NombreCliente'],
        discount: data['Descuento'],
        iva: data['IVA'],
        billTotal: 0,
        billTotalIva: 0
      }
      const total = this.calculeTotalBill(elementDataTable['detail']);
      elementDataTable['billTotal'] = Number(this.calculeDecimal(elementDataTable['discount'], total, 'discount'));
      elementDataTable['billTotalIva'] = Number(this.calculeDecimal(elementDataTable['iva'], elementDataTable['billTotal'], 'iva'));
    
    return elementDataTable;
  }

  calculeDecimal(num: number, overall: number, type: string) {
    const typeNumber = (num - Math.floor(num) === 0) ? 'integer' : 'decimal';

    if(num === 0) {
      return overall;
    }

    if (typeNumber === 'integer' && num <= 100) {
      return type === 'iva' ? Number(overall + (overall * (num/100)))
        : Number(overall - (overall * (num/100))); 
    } else if ( typeNumber === 'integer' && num > 100 ) {
      return type === 'iva' ? overall + num : overall - num; 
    }

    if(typeNumber === 'decimal') {
      return type === 'iva' ? Number(overall + (overall * num)) 
        : Number(overall - (overall * num));
    }
  }

  private transformDetails (details: any): Array<Detail> {
    let resultDetails: Array<Detail> = [];
    details.forEach((element: any) => {
      const detail: Detail = {
        item: element['Item'],
        product: element['Producto'],
        amount: element['Cantidad'],
        unitPrice: element['PrecioUnitario'],
        totalPrice: element['Cantidad'] * element['PrecioUnitario'],
      }
      resultDetails.push(detail);
    });
    return resultDetails;
  }

  private calculeTotalBill (details: Array<Detail>): number {
    let resultTotal: number = 0;
    details.forEach((element: any) => {
      resultTotal += element['totalPrice'];
    });
    return resultTotal;
  }
  
}
