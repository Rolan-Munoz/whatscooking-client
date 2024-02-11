import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../../models/recipe';
import { User } from '../../../models/user';
import { Comment } from '../../../models/comment';
import { LoginService } from '../../../services/auth/login.service';
import { CommentService } from '../../../services/comment/comment.service';
import { FavoriteService } from '../../../services/favorite/favorite.service';
import { RecipesService } from '../../../services/recipes/recipes.service';;
import { jwtDecode } from 'jwt-decode';
import { CustomJwtPayload } from '../../../services/auth/customJwtPayload';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-recipe-details-public',
  templateUrl: './recipe-details-public.component.html',
  styleUrl: './recipe-details-public.component.css'
})
export class RecipeDetailsPublicComponent implements OnInit{

  recipe?: Recipe;
  isFavorite?: boolean;
  userId?: number;
  user?: User;
  comments?: Comment[];

  constructor(private recipesService: RecipesService, private userService:UserService, private recipeService: RecipesService, private route: ActivatedRoute, private router: Router , private favoriteService: FavoriteService,
    private loginService: LoginService, private commentService: CommentService) {}

    ngOnInit(): void {
      const recipeIdString = this.route.snapshot.paramMap.get('recipeId');
      console.log(`recipeIdString: ${recipeIdString}`); // Imprime el valor de recipeIdString
    
      if (typeof recipeIdString === 'string' && recipeIdString !== '') {
        const recipeId = Number(recipeIdString);
        console.log(`recipeId: ${recipeId}`); // Imprime el valor de recipeId
        if (!isNaN(recipeId)) {
          this.recipeService.getRecipeById(recipeId).subscribe(recipe => {
            this.recipe = recipe;
            this.commentService.getCommentsByRecipe(recipeId).subscribe(comments => {
              this.comments = comments;
            })
          });
        } else {
          throw new Error('ID de receta no es un número');
        }
      } else {
        throw new Error('ID de receta no encontrado');
      }
    
      this.loginService.currentUserLoginOn.subscribe({
        next: (userLoginOn) => {
          if (userLoginOn) {
            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            if (userData && userData.id) {
              this.userService.getUser(userData.id).subscribe(user => {
                if (user) {
                  this.user = user;
                  if (this.user && this.recipe) {
                    this.favoriteService.isFavorite(this.user.id, this.recipe.id).subscribe(isFavorite => {
                      this.isFavorite = isFavorite;
                    });
                  }
                }
              });
            }
          }
        }
      });
      
    }
    
  
    toggleFavorite(): void {
      if (this.user && this.recipe) {
        if (this.isFavorite) {
          this.favoriteService.removeFavorite(this.user.id, this.recipe.id).subscribe(() => {
            this.isFavorite = false;
          });
        } else {
          this.favoriteService.addFavorite(this.user.id, this.recipe.id).subscribe(() => {
            this.isFavorite = true;
          });
        }
      }
    }

    addComment(content: string): void {
      if (this.user && this.recipe) {
        this.commentService.addComment(this.user.id, this.recipe.id, content).subscribe(() => {
          if(this.recipe){this.commentService.getCommentsByRecipe(this.recipe.id).subscribe(comments => {
            this.comments = comments;
          });}
        });
      }
    }

    isAdmin(user?: User): boolean {
      const isAdmin = user && user.roles ? user.roles.map(role => role.name).includes('ADMIN') : false;
      console.log('Is Admin:', isAdmin); // Agrega esta línea
      return isAdmin;
    }
    
    deleteComment(commentId: number, commentUserId: number): void {
      const token = sessionStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token) as CustomJwtPayload;
        console.log('Decoded token:', decodedToken);
        const userId = decodedToken.id;
        const userRoles = decodedToken.role; // Extrae los roles del token
    
        let isCommentAuthor = commentUserId === userId;
        let isAdmin = userRoles && userRoles.includes('ADMIN');
        console.log('Is Comment Author:', isCommentAuthor); // Agrega esta línea
        console.log('Is Admin:', isAdmin); // Agrega esta línea
    
        if (isCommentAuthor || isAdmin) {
          this.commentService.removeComment(commentId).subscribe(() => {
            // Actualizar la lista de comentarios después de borrar un comentario
            if(this.recipe) {
              this.commentService.getCommentsByRecipe(this.recipe.id).subscribe(comments => {
                this.comments = comments;
              });
            }
          });
        } else {
          console.log('No tienes permiso para eliminar este comentario');
        }
      }
    }

    deleteRecipe(recipeId: number, recipeUserId: number): void {
      const token = sessionStorage.getItem('token');
      if (token) {
          const decodedToken = jwtDecode(token) as CustomJwtPayload;
          console.log('Decoded token:', decodedToken);
          const userId = decodedToken.id;
          const userRoles = decodedToken.role; // Extrae los roles del token
  
          let isRecipeAuthor = recipeUserId === userId;
          let isAdmin = userRoles && userRoles.includes('ADMIN');
          console.log('Is Recipe Author:', isRecipeAuthor); // Agrega esta línea
          console.log('Is Admin:', isAdmin); // Agrega esta línea
  
          if (isRecipeAuthor || isAdmin) {
              this.recipesService.deleteRecipe(recipeId).subscribe(() => {
                  // Redirige al usuario a la lista de recetas después de borrar una receta
                  this.router.navigate(['/recipes']);
              });
          } else {
              console.log('No tienes permiso para eliminar esta receta');
          }
      }
  }
  
}
