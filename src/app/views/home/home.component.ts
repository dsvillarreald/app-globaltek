import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils-service/utils.service';
import { BillingService } from '../../services/billing-service/billing-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataSet: any;

  constructor(private billingService: BillingService, private utilsService: UtilsService ) { }

  ngOnInit(): void {
    this.billingService.getBillings().subscribe(
      data => {
        this.dataSet = this.utilsService.transformDataTable(data);
      }, error => {
        console.error('Error consultando lista de facturas', error);
      }
    )
  }

}
