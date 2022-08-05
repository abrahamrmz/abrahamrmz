import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportesComponent } from './reportes/reportes.component';
import { PruebaComponent } from './prueba/prueba.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { InterceptorService } from './services/interceptor.service';
import { NuevoComponent } from './nuevo/nuevo.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PendientesComponent } from './pendientes/pendientes.component';
import { ChatComponent } from './chat/chat.component';
import { FinalizadosComponent } from './finalizados/finalizados.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { ToastrModule } from 'ngx-toastr';
import { EquiposComponent } from './equipos/equipos.component';
import { DataTablesModule } from 'angular-datatables';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BitacoraComponent } from './bitacora/bitacora.component';
import { FiltrarComponent } from './filtrar/filtrar.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ChartModule } from 'primeng/chart';
import { MantenimientosComponent } from './mantenimientos/mantenimientos.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportesComponent,
    PruebaComponent,
    LoginComponent,
    NuevoComponent,
    NavbarComponent,
    PendientesComponent,
    ChatComponent,
    FinalizadosComponent,
    CuentaComponent,
    EquiposComponent,
    BitacoraComponent,
    FiltrarComponent,
    EstadisticasComponent,
    MantenimientosComponent,
  ],
  imports: [
    ChartModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    BrowserModule,
    RouterModule,
    MatProgressSpinnerModule,
    DataTablesModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbAlertModule,
    HttpClientModule,
    AutocompleteLibModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      maxOpened: 3,
      timeOut: 3000
    }),
  ],
  providers: [CookieService, {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
