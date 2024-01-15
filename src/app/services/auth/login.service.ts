import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environment/environment';
import { User } from '../../models/user';
import { UserService } from '../user/user.service';
import { CustomJwtPayload } from './customJwtPayload';
import { loginRequest } from './loginRequest';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<string> = new BehaviorSubject<string>("");
  user?:User;
  errorMessage:string="";

  constructor(private http:HttpClient, private userService:UserService) { 
    this.currentUserLoginOn= new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
    this.currentUserData = new BehaviorSubject<string>(sessionStorage.getItem("token") || "");

  }

  
  login(credentials: loginRequest): Observable<any> {
    return this.http.post<any>(environment.urlApi + "auth/login", credentials).pipe(
      tap((response) => {
        const token = response.accessToken;
        sessionStorage.setItem("token", token);
        this.currentUserData.next(token);
        this.currentUserLoginOn.next(true);
        const decodedToken = jwtDecode(token) as CustomJwtPayload;
        const userId = decodedToken.id;

        if (userId) {
          this.userService.getUser(userId).subscribe({
            next: (userData) => {
              localStorage.setItem('user', JSON.stringify(userData));
            }
          })
        }
      }),
      catchError(this.handleError)
    );
  }
  


  logout():void{
    sessionStorage.removeItem("token");
    localStorage.removeItem("user");
    this.currentUserLoginOn.next(false);
  }

  private handleError(error:HttpErrorResponse) {
    if(error.status===0) {
      console.error('Se ha producido un error ' + error.error);
    } else {
      console.error('Codigo de estado del error' + error.status + error.error);
    }
    return throwError(() => new Error('Se ha producido un fallo, intentelo de nuevo'));
  }

  get userData():Observable<string>{
    return this.currentUserData.asObservable();
  }


  get userLoginOn():Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  get userToken():string{
    return this.currentUserData.value;
  }
}
