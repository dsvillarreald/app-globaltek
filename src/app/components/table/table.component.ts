import { Component, OnInit, Input} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { DataSet } from 'src/app/structures';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit  {

  @Input() data: Array<DataSet> = [];

  

  displayedColumns: string[] = ['billNumber', 'clientName', 'date', 'billTotal', 'billTotalIva', 'actions'];
  dataSource: any = null; 
  dataSourceCount: any = null; 
  dataSourceCredit: any = null; 
  dataSourceOthers: any = null; 
  allTitle:any;
  othersTitle:any;
  countTitle:any;
  creditTitle:any;

  constructor() { }

  ngOnInit(): void {
    this.initalizedAll();
    this.initalizedCount();
    this.initalizedCredit();
    this.initalizedOthers();
    
  }

  initalizedAll (): void {
    this.dataSource = new MatTableDataSource<DataSet>(this.data);
    this.allTitle = `Todo (${this.data.length})`;
  }

  initalizedCount (): void {
    const dataFilter = this.data.filter(element => element.paymentType.toLowerCase() === 'contado');
    this.dataSourceCount = new MatTableDataSource<DataSet>(dataFilter);
    this.countTitle = `Contado (${dataFilter.length})`;
  }

  initalizedCredit (): void {
    const dataFilter = this.data.filter(element => element.paymentType.toLowerCase() === 'credito' );
    this.dataSourceCredit = new MatTableDataSource<DataSet>(dataFilter);
    this.creditTitle = `Crédito (${dataFilter.length})`;
  }

  initalizedOthers (): void {
    
    const dataFilter = this.data.filter(element => ['credito', 'contado'].indexOf(element.paymentType.toLowerCase()) === -1);
    this.dataSourceOthers = new MatTableDataSource<DataSet>(dataFilter);
    this.othersTitle = `Otros (${dataFilter.length})`;
  }

}
