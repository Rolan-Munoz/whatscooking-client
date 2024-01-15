import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorServiceService implements HttpInterceptor {

  constructor(private loginService:LoginService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Interceptando solicitud:', req); // Imprime la solicitud en la consola
  
    let token: string = this.loginService.userToken;
    if (token && !token.startsWith('Bearer ')) {
      token = `Bearer ${token}`;
    }
    if (token) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
          'Authorization': token,
        },
      });
      console.log('Solicitud después de agregar el encabezado de autorización:', req); // Imprime la solicitud después de agregar el encabezado de autorización
    }
  
    return next.handle(req);
  }
  
}
