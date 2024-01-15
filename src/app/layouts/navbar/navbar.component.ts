import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  userLoginOn:boolean=false;
  user?:User;

  constructor(private loginService:LoginService) {}

  logout(): void {
    this.loginService.logout();
  }


  
  ngOnDestroy(): void {
    this.loginService.currentUserLoginOn.unsubscribe();
  }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) => {
          this.userLoginOn=userLoginOn;
        } 
      }
    )
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData && userData.name) {
      this.user =userData;
    }
  }

}
