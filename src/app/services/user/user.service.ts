import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environment/environment';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUser(id:number):Observable<User>{
    return this.http.get<User>(environment.urlApi+"users/"+id).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error:HttpErrorResponse) {
    if(error.status===0) {
      console.error('se ha producido un error ', error.error );
    }else{
      console.error('Error de backend : ', error.status, error.error);
    }
    return throwError(()=> new Error("Algo no funciono correctamente, por favor iontentelo de nuevo"));
  }
}
