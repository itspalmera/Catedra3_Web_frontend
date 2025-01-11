import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Login } from '../../interfaces/Login';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login-form',
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        const login: Login = {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
        };
        const token = await this.authService.login(login);
        if (token) {
          this.router.navigate(['/product-list']); // Redirige al dashboard o página principal
        }
      } catch (error) {
        this.errorMessage = 'Error al iniciar sesión. Por favor, verifica tus credenciales.';
        console.error('Error de login:', error);
      }
    } else {
      this.errorMessage = 'Por favor, completa el formulario correctamente.';
    }
  }
}
