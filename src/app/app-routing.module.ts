import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { RecipeDetailsPublicComponent } from './pages/recipes/recipe-details-public/recipe-details-public.component';
import { RecipeDetailsComponent } from './pages/recipes/recipe-details/recipe-details.component';
import { RecipesFormComponent } from './pages/recipes/recipes-form/recipes-form.component';
import { RecipesComponent } from './pages/recipes/recipes.component';

const routes: Routes = [
    {path:'', component:HomeComponent, pathMatch: 'full'},
    {path:'login', component:LoginComponent},
    {path:'dashboard', component:DashboardComponent},
    {path:'recipes', component:RecipesComponent},
    {path:'register', component:RegisterComponent},
    {path: 'recipesForm', component:RecipesFormComponent},
    {path: 'recipeDetails/:recipeId', component:RecipeDetailsComponent},
    {path: 'recipeDetailsPublic/:recipeId', component:RecipeDetailsPublicComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
