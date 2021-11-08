import { Component, Input, OnInit, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { Detail } from 'src/app/structures';

@Component({
  selector: 'app-detail-amounts',
  templateUrl: './detail-amounts.component.html',
  styleUrls: ['./detail-amounts.component.css']
})
export class DetailAmountsComponent implements OnInit, DoCheck {

  @Input() iva: number = 19;
  @Input() products: Array<Detail> = new Array();
  @Input() discount: number = 0;
  @Input() onlyShowData?: any;
  overallWithoutIva: number = 0;
  overallWithIva: number = 0;
  ivaCount: number = 0;
  showIvaSimple = false;

  constructor() { }

  ngDoCheck(): void {
    if (!!this.onlyShowData) {
      this.showSimplyData();
    } else {
      this.calculeAmount(false);
      this.calculeAmount(true);
    }
  }

  ngOnInit(): void {
    if (!!this.onlyShowData) {
      this.showSimplyData();
    } else {
      this.calculeAmount(false);
      this.calculeAmount(true);
    }
    
  }

  showSimplyData() {
    this.showIvaSimple = true;
    this.ivaCount = this.onlyShowData['iva'];
    this.overallWithIva = this.onlyShowData['billTotalIva'];
    this.overallWithoutIva = this.onlyShowData['billTotal'];
  }

  calculeAmount(withoutIva: boolean) {
    this.showIvaSimple = false;
    let result = 0;
    const amountField = withoutIva ? 'overallWithoutIva' : 'overallWithIva';
    this.products.forEach(product => {
      result += product.totalPrice;
    });
    result = this.discount > 0 ? result - (result * (this.discount / 100)) 
      : result;
    this.ivaCount = !withoutIva ? result * (this.iva / 100): this.ivaCount;
    this[amountField] = withoutIva ? result : result + this.ivaCount; 
  } 

}
