import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorServiceService } from './services/auth/jwt-interceptor-service.service';
import { RegisterComponent } from './auth/register/register.component';
import { RecipesFormComponent } from './pages/recipes/recipes-form/recipes-form.component';
import { RecipeDetailsComponent } from './pages/recipes/recipe-details/recipe-details.component';
import { RecipeDetailsPublicComponent } from './pages/recipes/recipe-details-public/recipe-details-public.component';





@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RecipesComponent,
    LoginComponent,
    RegisterComponent,
    RecipesFormComponent,
    RecipeDetailsComponent,
    RecipeDetailsPublicComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorServiceService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
