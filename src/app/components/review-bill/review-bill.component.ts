import { Component, Input, OnInit } from '@angular/core';
import { Detail } from 'src/app/structures';

@Component({
  selector: 'app-review-bill',
  templateUrl: './review-bill.component.html',
  styleUrls: ['./review-bill.component.css']
})
export class ReviewBillComponent implements OnInit {

  @Input() billElenent: any;
  productList: Array<Detail> = new Array();
  iva: number = 0;
  discount: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.iva = this.billElenent['iva'];
    this.discount = this.billElenent['discount'];
    this.productList = this.billElenent['detail'];
    
  }

}
