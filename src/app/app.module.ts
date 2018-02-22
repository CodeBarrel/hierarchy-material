import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// App Components
import { AppRoutingModule } from './app-routing.module';

// App Components
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { HierarchyComponent } from './home/hierarchy/hierarchy.component';
import { ViewComponent } from './home/hierarchy/view/view.component';
import { NodeComponent } from './home/hierarchy/node/node.component';
import { HierarchyService } from './services/hierarchy.service';
import { AuthService } from './services/auth.service';

// App Routes
import { routing } from './routes/app.routing';

// App Guards
import { AuthGuard } from './guards/auth.guard';

// App Third Party Tools
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    HierarchyComponent,
    ViewComponent,
    NodeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    ToastModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    AuthService,
    HierarchyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
