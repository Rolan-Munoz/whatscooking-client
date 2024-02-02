import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Recipe } from '../../../models/recipe';
import { CustomJwtPayload } from '../../../services/auth/customJwtPayload';
import { RecipesService } from '../../../services/recipes/recipes.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe | undefined;

  constructor(private route: ActivatedRoute, private recipesService: RecipesService) { }

  ngOnInit(): void {
    const recipeIdString = this.route.snapshot.paramMap.get('recipeId');
    console.log(`recipeIdString: ${recipeIdString}`); // Imprime el valor de recipeIdString
  
    const token = sessionStorage.getItem('token');
    let userId: number;
    if (token !== null) {
      const decodedToken = jwtDecode(token) as unknown as CustomJwtPayload;
      userId = decodedToken.id;
    } else {
      throw new Error('Token no encontrado');
    }
    if (typeof recipeIdString === 'string' && recipeIdString !== '') {
      const recipeId = Number(recipeIdString);
      console.log(`recipeId: ${recipeId}`); // Imprime el valor de recipeId
      if (!isNaN(recipeId)) {
        this.recipesService.getRecipeByUserId(userId, recipeId).subscribe(recipe => {
          this.recipe = recipe;
        });
      } else {
        throw new Error('ID de receta no es un número');
      }
    } else {
      throw new Error('ID de receta no encontrado');
    }
  }
  
  
  
}



