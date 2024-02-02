import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Recipe } from '../../models/recipe';
import { RecipeRequest } from '../../pages/recipes/recipes-form/recipeRequest';
import { CustomJwtPayload } from '../auth/customJwtPayload';
import {Page} from '../../models/page';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {


  
  
  constructor(private http:HttpClient) { }

  getAllRecipes(page: number, pageSize: number): Observable<Page<Recipe>> {
    const params = new HttpParams()
        .set('page', page.toString())
        .set('size', pageSize.toString());

    return this.http.get<Page<Recipe>>(environment.urlApi + "recipes", {params: params}).pipe(
        catchError(this.handleError)
    )
}

  
  getRecipeByUserId(userId: number, recipeId: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${environment.urlApi}users/${userId}/recipes/${recipeId}`);
  }
  

  createRecipe(recipe: RecipeRequest): Observable<Recipe> {
    const token = sessionStorage.getItem('token');
    let userId: number; // Cambia el tipo a number
    if (token !== null) {
      const decodedToken = jwtDecode(token) as unknown as CustomJwtPayload;
      userId = decodedToken.id;
      return this.http.post<Recipe>(`${environment.urlApi}users/${userId}/recipes`, recipe);
    } else {
      // Maneja el caso en que el token es null
      // Puedes lanzar un error o redirigir al usuario a la página de inicio de sesión
      throw new Error('Token no encontrado');
    }
  }

  getRecipeById(recipeId: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${environment.urlApi}recipes/${recipeId}`)
  }

  getRecipesByTitle(page: number, pageSize: number, title: string): Observable<Page<Recipe>> {
    const params = new HttpParams()
        .set('page', page.toString())
        .set('size', pageSize.toString());

    return this.http.get<Page<Recipe>>(environment.urlApi + "recipes/tittle/" + title, {params: params}).pipe(
        catchError(this.handleError)
    )
}


  
  
  

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
  
}


