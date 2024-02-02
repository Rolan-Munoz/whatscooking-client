import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/auth/register.service';
import { registerRequest } from '../../services/auth/registerRequest';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerError:string='';
  photoBase64: string | undefined;

  registerForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    photo: [''],
  });

  constructor(private formBuilder:FormBuilder, private router:Router, private registerService:RegisterService) {
  }

  get name() {
    return this.registerForm.controls.name;
  }

  get email() {
    return this.registerForm.controls.email;
  }

  get password() {
    return this.registerForm.controls.password;
  }

  get photo() {
    return this.registerForm.controls.photo;
  }

  ngOnInit(): void {
  }

  register() {
    if (this.registerForm.valid) {
      // Crear una copia de los datos del formulario
      const registerData: registerRequest = {
        name: this.registerForm.value.name || '',
        email: this.registerForm.value.email || '',
        password: this.registerForm.value.password || '',
        photo: this.photoBase64 || ''
      };
  
      this.registerService.checkUsernameAvailability(registerData.name).subscribe(existsName => {
        if (existsName) {
          alert('El nombre de usuario ya está en uso. Por favor, elige otro.');
        } else {
          this.registerService.checkEmailAvailability(registerData.email).subscribe(existsEmail => {
            if (existsEmail) {
              alert('El correo electrónico ya está en uso. Por favor, elige otro.');
            } else {
              this.registerService.register(registerData).subscribe({
                next: () => {
                  console.info('Registro completado');
                },
                error: (errorData) => {
                  console.error(errorData);
                  this.registerError = errorData;
                },
                complete: () => {
                  this.router.navigateByUrl('/login');
                  this.registerForm.reset();
                }
              });
            }
          });
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
      alert("Error al ingresar los datos de registro");
    }
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
      if (field === 'photo') {
        this.photoBase64 = base64String;
      }
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }
  
  
  
  

}
