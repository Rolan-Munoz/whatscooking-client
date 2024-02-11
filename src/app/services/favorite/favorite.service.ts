import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private urlEndpoint = environment.urlApi + 'favorites';


  constructor(private http: HttpClient) { }

  

  addFavorite(userId: Number, recipeId: Number): Observable<any> {
    let url = `${this.urlEndpoint}/${userId}/${recipeId}`;
    return this.http.post<any>(url, {});
  }

  removeFavorite(userId: number, recipeId: number): Observable<any> {
    let url = `${this.urlEndpoint}/${userId}/${recipeId}`;
    return this.http.delete<any>(url);
  }

  getFavoritesByUser(userId: number): Observable<any> {
    let url = `${this.urlEndpoint}/${userId}`;
    return this.http.get<any>(url);
  }

  isFavorite(userId: number, recipeId: number): Observable<any> {
    let url = `${this.urlEndpoint}/${userId}/${recipeId}/isFavorite`;
    return this.http.get<any>(url);
  }


}
