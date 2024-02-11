import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private urlEndpoint = environment.urlApi + 'comments';

  constructor(private http: HttpClient) { }

  addComment(userId: Number, recipeId: Number, text: String): Observable<any> {
    let url = `${this.urlEndpoint}/${userId}/${recipeId}`;
    return this.http.post<any>(url, {text: text});
  }

  removeComment(commentId: number): Observable<any> {
    let url = `${this.urlEndpoint}/${commentId}/remove`;
    return this.http.delete<any>(url);
  }

  getCommentsByUser(userId: number): Observable<any> {
    let url = `${this.urlEndpoint}/users/${userId}`;
    return this.http.get<any>(url);
  }

  getCommentsByRecipe(recipeId: number): Observable<any> {
    let url = `${this.urlEndpoint}/recipe/${recipeId}`;
    return this.http.get<any>(url);
  }

  getCommentById(commentId: number): Observable<any> {
    let url = `${this.urlEndpoint}/${commentId}`;
    return this.http.get<any>(url);
  }

  getRecentComments(): Observable<any> {
    let url = `${this.urlEndpoint}/recent`;
    return this.http.get<any>(url);
}

}
