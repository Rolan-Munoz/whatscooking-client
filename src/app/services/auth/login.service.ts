import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../../models/user';
import { loginRequest } from './loginRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData:BehaviorSubject<User> = new BehaviorSubject<User>({id:0, name:'', email:''});

  constructor(private http:HttpClient) { }

  login(credentials:loginRequest):Observable<User> {
    return this.http.get<User>('././assets/data.json').pipe(
      tap((userData: User) => {
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);
      }),
      (catchError(this.handleError))
    )
      
  }

  private handleError(error:HttpErrorResponse) {
    if(error.status===0) {
      console.error('Se ha producido un error ' + error.error);
    } else {
      console.error('Codigo de estado del error' + error.status + error.error);
    }
    return throwError(() => new Error('Se ha producido un fallo, intentelo de nuevo'));
  }

  get userData():Observable<User> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn():Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }
}
