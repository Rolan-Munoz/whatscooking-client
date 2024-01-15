import { Component, OnDestroy, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../models/user';
import { CustomJwtPayload } from '../../services/auth/customJwtPayload';
import { LoginService } from '../../services/auth/login.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  user?:User;
  errorMessage:string="";
  userLoginOn:boolean=false;
  userData?:User

  constructor(private loginService:LoginService, private userService:UserService) {
}



ngOnInit(): void {
  this.loginService.currentUserLoginOn.subscribe({
    next: (userLoginOn) => {
      this.userLoginOn = userLoginOn;
      const token = this.loginService.userToken;
      const decodedToken = jwtDecode(token) as CustomJwtPayload;
      const userId = decodedToken.id;
      if (userId) {
        this.userService.getUser(userId).subscribe({
          next: (userData) => {
            this.user = userData;
          },
          error: (errorData) => {
            this.errorMessage = errorData;
          },
          complete: () => {
            console.info("User Data ok");
          }
        });
      } else {
        // Maneja el caso en que userId es undefined
      }
    }
  });
}



}
