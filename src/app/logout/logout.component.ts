import { Component, OnInit } from '@angular/core';
import { UserBaseService } from '../shared/services/user-base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(public userbaseService:UserBaseService,public router:Router) { }

  ngOnInit() {
    this.userbaseService.logout() && this.router.navigateByUrl('/login');
  }

}
