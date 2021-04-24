import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customerList$: Observable<Customer[]> = this.customerService.getAll();

  phrase: string = '';

  direction: number = 1;
  columnKey: string = '';

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
  }

  onDelete(customer: Customer): void {

    this.customerService.delCustomer(customer).subscribe(
      () => {
         this.customerList$ = this.customerService.getAll();
       }
    );
  }

  onFilterPhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  onColumnSelect(key: string): void {
    if (this.columnKey === key) {
      this.direction = this.direction * -1;  /* -1 esetén  */     /*  1 esetén  */     /*  1 esetén  */
    } else {                           /* NÖVEKVŐ és CSÖKKENŐ*/    /* NÖVEKVŐ */    /* CSÖKKENŐ  */
      this.direction = 1;                              /*  1 esetén  */    /*  1 esetén  */     /*  -1 esetén  */
    }
    this.columnKey = key;
  }



}
