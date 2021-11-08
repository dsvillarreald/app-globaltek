import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Detail } from 'src/app/structures';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  @Output() notifiedProduct: EventEmitter<Detail> = new EventEmitter();

  createProduct: FormGroup = new FormGroup({
    token: new FormControl(),
    handle: new FormControl()
  });
  disabled: boolean = true;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initFielsForm();
  }

  initFielsForm() {
    this.createProduct = this.formBuilder.group({
      item: ['', Validators.compose([Validators.required])],
      product: ['', Validators.compose([Validators.required])],
      amount: ['', Validators.compose([Validators.required])],
      unitPrice: ['', Validators.compose([Validators.required])],
      totalPrice: ['', Validators.compose([Validators.required])]
    });
  }

  validateForm() {
    if(!!this.createProduct.controls['unitPrice'].value && !!this.createProduct.controls['amount'].value) {
      this.createProduct.controls['totalPrice']
      .setValue(Number(this.createProduct.controls['unitPrice'].value) * Number(this.createProduct.controls['amount'].value));
    }
    this.disabled = !this.createProduct.valid;
  }

  sentProduct() {
    this.notifiedProduct.emit({
      item: this.createProduct.controls['item'].value,
      product: this.createProduct.controls['product'].value,
      amount: this.createProduct.controls['amount'].value,
      unitPrice: this.createProduct.controls['unitPrice'].value,
      totalPrice: this.createProduct.controls['totalPrice'].value
    });
    
    this.createProduct.reset();
  }

}

