import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/login/login.module').then((mod) => mod.LoginModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (mod) => mod.DashboardModule
      ),
  },
  {
    path: 'notfoundpage',
    component: NotFoundPageComponent,
  },
  {
    path: '**',
    redirectTo: 'notfoundpage',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
