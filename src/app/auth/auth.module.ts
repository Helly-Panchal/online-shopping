import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms'
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    AuthRoutingModule
  ],
  exports: [LoginComponent, RegisterComponent, PageNotFoundComponent]
})
export class AuthModule { }
