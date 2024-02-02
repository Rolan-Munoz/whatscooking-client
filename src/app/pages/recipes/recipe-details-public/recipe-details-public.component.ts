import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../../models/recipe';
import { RecipesService } from '../../../services/recipes/recipes.service';

@Component({
  selector: 'app-recipe-details-public',
  templateUrl: './recipe-details-public.component.html',
  styleUrl: './recipe-details-public.component.css'
})
export class RecipeDetailsPublicComponent implements OnInit{

  recipe?: Recipe;

  constructor(private recipeService: RecipesService, private route: ActivatedRoute) {}


  ngOnInit(): void {
    const recipeIdString = this.route.snapshot.paramMap.get('recipeId');
    console.log(`recipeIdString: ${recipeIdString}`); // Imprime el valor de recipeIdString
  
    if (typeof recipeIdString === 'string' && recipeIdString !== '') {
      const recipeId = Number(recipeIdString);
      console.log(`recipeId: ${recipeId}`); // Imprime el valor de recipeId
      if (!isNaN(recipeId)) {
        this.recipeService.getRecipeById(recipeId).subscribe(recipe => {
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
