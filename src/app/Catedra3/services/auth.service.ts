import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Login } from '../interfaces/login';
import { LoginResponse } from '../interfaces/loginResponse';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = 'http://localhost:5080/api/auth';
  public errors: string[] = [];

  private http = inject(HttpClient);

  // Método para iniciar sesión
  async login(login: Login): Promise<string> {
    try {
      console.log('Login data:', login);
      const response = await firstValueFrom(
        this.http.post<LoginResponse>(`${this.baseUrl}/login`, login)
      );
      // Guardamos el token en una cookie por 1 día
      this.setCookie("auth_token", response.token, 1);

      return response.token;
    } catch (error) {
      console.error('Error en el login:', error);
      throw error;
    }
  }

  // Método para registrar usuario
  async register(userData: User): Promise<string> {
    try {
      // Envía todos los campos requeridos por el backend
      const response = await firstValueFrom(
        this.http.post<string>(`${this.baseUrl}/users`, userData)
      );
      return response; // Retorna directamente la respuesta
    } catch (error) {
      // Maneja el error de forma robusta
      if (error instanceof HttpErrorResponse) {
        console.error('Error en el registro:', error.error.message);
        throw new Error(`Error en el registro: ${error.message}`);
      }
      console.error('Error desconocido:', error);
      throw new Error('Error inesperado en el registro.');
    }
  }

  // Función para decodificar el token
  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  }

  // Función para establecer una cookie
  private setCookie(name: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }
}
