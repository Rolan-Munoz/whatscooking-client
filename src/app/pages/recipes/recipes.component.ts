import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { RecipesService } from '../../services/recipes/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit{

  recipes?: Recipe[];
  totalRecipes?: number;
  totalPages?: number;
  currentPage: number = 1;
  searchTitle: string ='';

  constructor(private recipeService:RecipesService) {
  }

  ngOnInit(): void {
    this.loadPage(this.currentPage);
  }
  loadPage(page: number): void {
    this.recipeService.getAllRecipes(page - 1, 6).subscribe(page => {
      this.recipes = page.content;
      this.totalRecipes = page.totalElements;
      this.totalPages = page.totalPages;
    });
  }

  search(): void {
    if (this.searchTitle) {
        this.recipeService.getRecipesByTitle(0, 6, this.searchTitle).subscribe(
            page => {
                this.recipes = page.content;
                this.totalRecipes = page.totalElements;
                this.totalPages = page.totalPages;
                this.currentPage = 1;
            },
            error => {
                alert("No es encuentra ninguna receta con el titulo proporcionado");
            }
        );
    } else {
        this.loadPage(this.currentPage);
    }
}



  

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPage(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.totalPages && this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPage(this.currentPage);
    }
}


}
