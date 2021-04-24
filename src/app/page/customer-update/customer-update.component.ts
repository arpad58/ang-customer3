import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerService } from 'src/app/service/customer.service';
import { switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/model/customer';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.scss']
})
export class CustomerUpdateComponent implements OnInit {

  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
     private router: Router

  ) { }

  ngOnInit(): void {
  }

  customer$: Observable<Customer> = this.activatedRoute.params.pipe(
    switchMap(params => {
            return this.customerService.get(Number(params.id));
    })
  );

  onSubmit(form: NgForm, customer: Customer): void {
    this.customerService.updateCustomer(customer).subscribe(
      () => this.router.navigate(['/'])
    );
  }



}
