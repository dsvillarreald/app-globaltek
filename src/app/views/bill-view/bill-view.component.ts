import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillingService } from 'src/app/services/billing-service/billing-service.service';
import { UtilsService } from 'src/app/services/utils-service/utils.service';

@Component({
  selector: 'app-bill-view',
  templateUrl: './bill-view.component.html',
  styleUrls: ['./bill-view.component.css']
})
export class BillViewComponent implements OnInit {
  bill: any;
  action: string = '';
  id: string = '';

  constructor(private activatedRote: ActivatedRoute, private billingService: BillingService,
    private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.activatedRote.params.subscribe(params => {
      this.action = params['action'];
      this.id = params['id'];
    });
    if (this.action === 'view' && this.id) {
      this.getBilltoReview();
    }
  }

  getBilltoReview() {
    this.billingService.getBillById(this.id).subscribe(
      response => {
        this.bill = this.utilsService.transformReviewBill(response);
      }, error => {
        this.bill = {};
        this.id = '';
        console.error('An error has occurred consulting the invoice', error);
      }
    )
  }


}
