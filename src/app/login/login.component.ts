import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserBaseService } from '../shared/services/user-base.service';
import { CookieService } from '../shared/services/cookie.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public inputType: string = 'password';
  userForm: FormGroup;
  errorMessage: boolean = false
  rememberUser: boolean = true
  public userDetails: any = {
    email: '',
    password: ''
  }
  constructor(public fb: FormBuilder, public userbaseService: UserBaseService, public cookieService: CookieService, public router: Router) { }

  ngOnInit() {
    this.formGroupBulid()
  }
  formGroupBulid() {
    this.userForm = this.fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
    });
  }

  onSubmit() {
    this.errorMessage = false;
    this.userbaseService.login(this.userDetails.email, this.userDetails.password).subscribe((response) => {
      if (response.success) {
        let storage = {
          'remember': this.rememberUser,
          'token': response.token,
          'userId': response.userId
        }
        this.cookieService.createCookie('storage', JSON.stringify(storage), 3);
        this.router.navigate(['/dashboard'])
      } else {
        this.errorMessage = true;
      }
    })
  }

  tooglepwd() {
    if (this.inputType === 'password') {
      this.inputType = 'text';
    } else if (this.inputType === 'text') {
      this.inputType = 'password';
    }
  }
}
