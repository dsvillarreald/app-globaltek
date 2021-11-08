import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Detail, DetailProducts } from 'src/app/structures';

@Component({
  selector: 'app-detail-products',
  templateUrl: './detail-products.component.html',
  styleUrls: ['./detail-products.component.css']
})
export class DetailProductsComponent implements OnInit {

  @Input() productList: Array<Detail> = new Array();
  @Input() editable: boolean = false;
  @Output() itemDelete: EventEmitter<string> = new EventEmitter();
  dataSet: Array<DetailProducts> = new Array();

  constructor() { }

  ngOnInit(): void {

  }

  notifyItem($event: string) {
    this.itemDelete.emit($event);
  }

}
