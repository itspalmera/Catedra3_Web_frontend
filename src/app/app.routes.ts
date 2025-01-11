import { Routes } from '@angular/router';
import { LoginComponent } from './Catedra3/pages/login/login.component';

export const routes: Routes = [

  // RUTA PRODUCT LIST (POR DEFECTO)
  {
    path: 'login', // Nombre de la ruta
    pathMatch: 'full', // Me redirija a users con cualquier cosa

    // Donde está el componente
    loadComponent: () =>
      import('./Catedra3/pages/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },


  {
    path: 'register',
    loadComponent: () =>
      import('./Catedra3/pages/registrer/registrer.component').then(
        (m) => m.RegistrerComponent
      ),
  },


  // validar que la ruta sea correcta
  {
    path: '', // Cualquier caso que no sea product-list en la URL
    pathMatch: 'full', // Me redirija a product-list con cualquier cosa
    redirectTo: 'product-list', // Redirigir a product-list
  },

];
