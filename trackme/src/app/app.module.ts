import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import '@angular/localize/init';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginCompanyComponent } from './login-company/login-company.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterUserComponent } from './register-user/register-user.component'
import { FooterComponent } from './footer/footer.component';
import { UsersComponent } from './users/users.component';

/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    NavbarComponent,
    LoginCompanyComponent,
    LoginUserComponent,
    NotFoundComponent,
    RegisterUserComponent,
    FooterComponent,
    UsersComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
