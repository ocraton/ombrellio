import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginLayoutComponent } from './components/login-layout/login-layout.component';
import { UserdashboardLayoutComponent } from './components/userdashboard-layout/userdashboard-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'user',
    component: UserdashboardLayoutComponent,
    children: [
      {
        path: 'prodotti',
        loadChildren: () => import('../features/prodotti/prodotti.module').then(m => m.ProdottiModule)
      },
      {
        path: 'categorie',
        loadChildren: () => import('../features/categorie/categorie.module').then(m => m.CategorieModule)
      },
      {
        path: 'attrezzature',
        loadChildren: () => import('../features/attrezzature/attrezzature.module').then(m => m.AttrezzatureModule)
      },
      // {
      //   path: 'ordini',
      //   loadChildren: () => import('../features/ordini/ordini.module').then(m => m.OrdiniModule)
      // },
      {
        path: 'chalets',
        loadChildren: () => import('../features/chalet/chalet.module').then(m => m.ChaletModule)
      },
      {
        path: 'clienti',
        loadChildren: () => import('../features/clienti/clienti.module').then(m => m.ClientiModule)
      },
      // {
      //   path: 'tavoli',
      //   loadChildren: () => import('../features/tavoli/tavoli.module').then(m => m.TavoliModule)
      // },
      {
        path: 'ombrelloni',
        loadChildren: () => import('../features/ombrelloni/ombrelloni.module').then(m => m.OmbrelloniModule)
      },
      {
        path: 'prenotazioni',
        loadChildren: () => import('../features/prenotazioni/prenotazioni.module').then(m => m.PrenotazioniModule)
      },
      {
        path: 'listino',
        loadChildren: () => import('../features/listino/listino.module').then(m => m.ListinoModule)
      },
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('../features/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'utenti',
        loadChildren: () => import('../features/utenti/utenti.module').then(m => m.UtentiModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../features/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'menu/:id',
        loadChildren: () => import('../features/menu/menu.module').then(m => m.MenuModule)
      },
    ]
  },
  {
    path: 'not-found',
    loadChildren: () => import('../features/not-found/not-found.module').then(m => m.NotFoundModule)
  },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
