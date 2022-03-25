import { UserCreateEditComponent } from './components/user-create-edit/user-create-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'user-list',
    component: UserListComponent,
  },
  {
    path: 'user/:id',
    component: UserCreateEditComponent,
  },
  {
    path: 'user',
    component: UserCreateEditComponent,
  },
  {
    path: '**',
    redirectTo: 'user-list',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
