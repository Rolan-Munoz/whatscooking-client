import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CustomJwtPayload } from '../../../services/auth/customJwtPayload';
import { RecipesService } from '../../../services/recipes/recipes.service';
import { RecipeRequest } from './recipeRequest';

@Component({
  selector: 'app-recipes-form',
  templateUrl: './recipes-form.component.html',
  styleUrl: './recipes-form.component.css'
})
export class RecipesFormComponent implements OnInit {

  recipeError: String = '';
  imageBase64: string | undefined;
  videoBase64: string | undefined;

  recipeForm = this.formBuilder.group({
    tittle: ['', [Validators.required]],
    ingredients: this.formBuilder.array([''], Validators.required),
    description: ['', [Validators.required]],
    instructions: ['', [Validators.required]],
    image: [''],
    video: [''],
  });

  constructor(private formBuilder:FormBuilder,private router: Router, private recipesService: RecipesService) {
  }

  ngOnInit(): void {
  }

  submitRecipe() {
    if (this.recipeForm.valid) {
      const recipe: RecipeRequest = {
        tittle: this.recipeForm.value.tittle || '',
        ingredients: this.recipeForm.value.ingredients as string[],
        description: this.recipeForm.value.description || '',
        instructions: this.recipeForm.value.instructions || '',
        image: this.imageBase64,
        video: this.videoBase64
      };
      this.recipesService.createRecipe(recipe).subscribe({
        next: (createdRecipe) => {
          console.info('Receta creada');
          console.log(createdRecipe);
          const token = sessionStorage.getItem('token');
          if (token === null) {
            // Maneja el caso en que el token es null
          } else {
            const decodedToken = jwtDecode(token) as unknown as CustomJwtPayload;
            const userId = decodedToken.id;
            if (createdRecipe && createdRecipe.id) { // Comprueba si createdRecipe y createdRecipe.id_recipe existen
              this.router.navigateByUrl(`recipeDetails/${createdRecipe.id}`);
            } else {
              console.error('Error: ID de receta no encontrado en la respuesta del servidor');
            }
          }
          
        },
        error: (errorData) => {
          console.error(errorData);
          // Maneja el error aquí
        },
        complete: () => {
          this.recipeForm.reset();
          
        }
      });
    } else {
      this.recipeForm.markAllAsTouched();
      this.recipeError = 'Error al ingresar los datos de la receta';
    }
  }

  createIngredient(): FormControl {
    return this.formBuilder.control('', Validators.required);
  }

  addIngredient() {
    this.ingredients.push(this.createIngredient());
  }
  
  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  onFileSelected(event: Event, field: any) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log(`Archivo seleccionado para ${field}: `, file);
    this.convertToBase64(file, field);
  }

  convertToBase64(file: File, field: any) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let base64String = reader.result as string;
      base64String = base64String.split(',')[1]; // Esto elimina "data:image/jpeg;base64,"
      console.log(`Cadena base64 para ${field}: `, base64String);
      if (field === 'image') {
        this.imageBase64 = base64String;
      } else if (field === 'video') {
        this.videoBase64 = base64String;
      }
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }
  
  
  
  
  
  
  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as unknown as FormArray;
  }

  get tittle() {
    return this.recipeForm.get('tittle');
  }
  
  
  get description() {
    return this.recipeForm.get('description');
  }
  
  get instructions() {
    return this.recipeForm.get('instructions');
  }
  
  get image() {
    return this.recipeForm.get('image');
  }
  
  get video() {
    return this.recipeForm.get('video');
  }
  
  
  
  

}
