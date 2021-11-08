import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BillingService } from 'src/app/services/billing-service/billing-service.service';
import { Detail } from 'src/app/structures';

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.css']
})
export class CreateBillComponent implements OnInit, OnChanges {
  startCreate: Date = new Date();
  panelOpenState = false;
  productList: Array<Detail> = new Array();

  createBill: FormGroup = new FormGroup({
    token: new FormControl(),
    handle: new FormControl()
  });
  iva: number = 19;
  discount: number = 0;
  enable = false;
  paymentTypeOptions = [
    {id: 'contado', value: 'Contado'},
    {id: 'credito', value: 'Crédito'}
  ]

  constructor(private formBuilder: FormBuilder, private billingService: BillingService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.validateForm();
  }
  
  ngOnInit(): void {
    this.initFielsForm();
  }

  initFielsForm() {
    this.createBill = this.formBuilder.group({
      billNumber: ['', Validators.compose([Validators.required])],
      paymentType: ['', Validators.compose([Validators.required])],
      clientDocument: ['', Validators.compose([Validators.required])],
      clientName: ['', Validators.compose([Validators.required])],
      discount: ['', Validators.compose([Validators.required])],
      iva: ['19', Validators.compose([Validators.required])]
    })
  }

  resetForm() {
    this.createBill.controls['billNumber'].setValue('');
    this.createBill.controls['paymentType'].setValue('');
    this.createBill.controls['clientDocument'].setValue('');
    this.createBill.controls['clientName'].setValue('');
    this.createBill.controls['discount'].setValue('');
    this.productList = new Array();
    this.enable = false;
    this.discount = 0;
  }

  generateBilNumber() {
    this.createBill.controls['billNumber'].setValue(Math.floor(Math.random() * (1000000 - 1)) + 1);
  }

  notifiedProduct($event: Detail) {
    this.productList.push($event);
    this.validateForm();
  }

  deleteProduct($event: string) {
    debugger
    this.productList = this.productList.filter(product => String(product.item) !== String($event));
  }

  validateForm() {
    this.iva = !!this.createBill.controls['iva'].value ? Number(this.createBill.controls['iva'].value) : this.iva;
    this.discount = !!this.createBill.controls['discount'].value ? Number(this.createBill.controls['discount'].value) : this.discount;

    this.enable = this.createBill.valid && this.productList.length > 0;
  }

  generateBill() {
    const body = {
      'NumeroFactura': this.createBill.controls['billNumber'].value,
      'Fecha': new Date(),
      'TipodePago': this.createBill.controls['paymentType'].value,
      'DocumentoCliente': this.createBill.controls['clientDocument'].value,
      'NombreCliente': this.createBill.controls['clientName'].value,
      'Descuento': this.createBill.controls['discount'].value,
      'IVA': this.createBill.controls['iva'].value,
      'Detalle': this.generateDetail()
    }
    this.billingService.postBilling(body).subscribe(
      () => {
        this.resetForm();
        console.log('The invoice was created successfully');
      }, error => {
        this.resetForm();
        console.error('Error The invoice was not created correctly', error);
      }
    )
  }

  generateDetail() {
    let detail: any[] = [];
    this.productList.forEach(element => {
      const product = {
        'Item': element.item,
        'Producto': element.product,
        'Cantidad': element.amount,
        'PrecioUnitario': element.unitPrice
      }
      detail.push(product);
    });
    return detail;
  }
}
