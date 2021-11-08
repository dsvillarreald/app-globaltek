import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataSet } from 'src/app/structures';

@Component({
  selector: 'app-table-body',
  templateUrl: './table-body.component.html',
  styleUrls: ['./table-body.component.css']
})
export class TableBodyComponent implements OnInit, AfterViewInit {

  @Input() displayedColumns: string[] = [];
  @Input() dataSource!: MatTableDataSource<DataSet>;
  showPagination: boolean = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private route: Router) { }
  ngOnInit(): void {
    this.showPagination = this.dataSource.data.length > 5;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  reviewBill(id: string) {
    this.route.navigate(['bill-view', 'view', id]);
  }


}
