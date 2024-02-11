import { Component, OnDestroy, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Favorite } from '../../models/favorite';
import { Recipe } from '../../models/recipe';
import { User } from '../../models/user';
import { CustomJwtPayload } from '../../services/auth/customJwtPayload';
import { LoginService } from '../../services/auth/login.service';
import { FavoriteService } from '../../services/favorite/favorite.service';
import { RecipesService } from '../../services/recipes/recipes.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  user?: User;
  errorMessage: string = "";
  userLoginOn: boolean = false;
  userData?: User;
  favorites: Recipe[] = [];

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private favoriteService: FavoriteService,
    private recipeService: RecipesService
  ) {}

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
              // Añade la obtención de favoritos aquí
              if (this.user?.id) {
                this.favoriteService.getFavoritesByUser(this.user.id).subscribe(favorites => {
                  favorites.forEach((favorite: Favorite) => {
                    this.recipeService.getRecipeById(favorite.recipeId).subscribe(recipe => {
                      this.favorites.push(recipe);
                    });
                  });
                });                
              }
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
