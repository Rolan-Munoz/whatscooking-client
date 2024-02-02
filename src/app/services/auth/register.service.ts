import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environment/environment';
import { registerRequest } from './registerRequest';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(credentials: registerRequest): Observable<any> {
    return this.http.post<any>(environment.urlApi + "auth/register", credentials).pipe(
      catchError(this.handleError)
    );
  }

  checkUsernameAvailability(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.urlApi}auth/existsByName/${username}`);
  }
  
  checkEmailAvailability(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.urlApi}auth/getByEmail/${email}`);
  }
  

  private handleError(error: HttpErrorResponse) {
    if (error.status >= 400 && error.status < 500) {
      console.error('Se ha producido un error del cliente: ' + error.error);
    } else if (error.status >= 500) {
      console.error('Se ha producido un error del servidor: ' + error.error);
    } else {
      console.info('Operación exitosa: ' + error.status);
      return of(error.status);
    }
    return throwError(() => new Error('Se ha producido un fallo, intentelo de nuevo'));
  }
  
  
}
