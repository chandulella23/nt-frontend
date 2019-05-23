import { Component, OnInit } from '@angular/core';
import { CookieService } from '../shared/services/cookie.service';
import { UserBaseService } from '../shared/services/user-base.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var jQuery: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  edit: boolean;
  cookie: any;
  storage: any;
  role: any;
  errorMessage: boolean;
  orders: any;
  orderForm: FormGroup;
  selectedOrder: any;

  constructor(public fb: FormBuilder, public cookieService: CookieService, public userbaseService: UserBaseService) { }

  ngOnInit() {
    this.cookie = this.cookieService.readCookie('storage');
    this.storage = this.cookie != null ? JSON.parse(this.cookie) : '';
    this.formGroupBulid()
    this.getOrders();
  }
  formGroupBulid() {
    this.orderForm = this.fb.group({
      'due_date': ['', Validators.compose([Validators.required])],
      'customer_name': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      'customer_address': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      'customer_phone': ['', Validators.compose([Validators.required])],
      'total': ['', Validators.compose([Validators.required])],
    });
  }
  getOrders() {
    this.userbaseService.getOrders().subscribe((response) => {
      if (response.success) {
        this.orders = response.orders;
      } else {
        this.errorMessage = true;
      }
    })
  }
  changeButtonProps(ref, prop = {}) {
    Object.keys(prop).forEach(key => {
      ref[key] = prop[key];
    })
  }

  createOrder(data, btnRef: any = '') {
    btnRef && this.changeButtonProps(btnRef, { textContent: 'Please wait...', disabled: true });
    this.userbaseService.createOrder(data).subscribe((res) => {
      if (res.success) {
        btnRef && this.changeButtonProps(btnRef, { textContent: 'Add', disabled: false });
        jQuery('#add-event').modal('hide')
        this.getOrders()
      }
    }, (error) => {
      btnRef && this.changeButtonProps(btnRef, { textContent: 'Add', disabled: false });
    })
  }

  editOrder(index) {
    this.selectedOrder = this.orders[index];
    this.orderForm.get('due_date').setValue(this.selectedOrder.due_date)
    this.orderForm.get('customer_name').setValue(this.selectedOrder.customer_name)
    this.orderForm.get('customer_address').setValue(this.selectedOrder.customer_address)
    this.orderForm.get('customer_phone').setValue(this.selectedOrder.customer_phone)
    this.orderForm.get('total').setValue(this.selectedOrder.total);
    this.edit = true;
  }

  updateOrder(data, btnRef: any = '') {
    btnRef && this.changeButtonProps(btnRef, { textContent: 'Please wait...', disabled: true });
    this.userbaseService.updateOrder(data).subscribe((res) => {
      if (res.success) {
        btnRef && this.changeButtonProps(btnRef, { textContent: 'Update', disabled: false });
        jQuery('#add-event').modal('hide')
        this.getOrders()
      }
    }, (error) => {
      btnRef && this.changeButtonProps(btnRef, { textContent: 'Update', disabled: false });
    })
  }
  removeOrder(index) {
    this.selectedOrder = this.orders[index];
    this.userbaseService.removeOrder(this.selectedOrder._id).subscribe((res) => {
      if (res.success) {
       
        this.getOrders()
      }
    }, (error) => {
    })
  }
}
