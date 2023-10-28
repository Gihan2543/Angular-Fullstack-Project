import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginCompanyComponent } from './login-company/login-company.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { TasksComponent } from './tasks/tasks.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterUserComponent},
  {path: 'user-login', component: LoginUserComponent},
  {path: 'company-login', component: LoginCompanyComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'users', component: UsersComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
