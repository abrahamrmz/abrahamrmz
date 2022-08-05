import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportesComponent } from './reportes/reportes.component';
import { PruebaComponent } from './prueba/prueba.component';
import { LoginComponent } from './login/login.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PendientesComponent } from './pendientes/pendientes.component';
import { ChatComponent } from './chat/chat.component';
import { FinalizadosComponent } from './finalizados/finalizados.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { EquiposComponent } from './equipos/equipos.component';
import { BitacoraComponent } from './bitacora/bitacora.component';
import { FiltrarComponent } from './filtrar/filtrar.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { MantenimientosComponent } from './mantenimientos/mantenimientos.component';

const routes: Routes = [
  { path: '', redirectTo: '/reportes', pathMatch: 'full' },
  { path : 'reportes', component: ReportesComponent},
  { path : 'prueba', component: PruebaComponent},
  { path : 'login', component: LoginComponent},
  { path : 'nuevo', component: NuevoComponent},
  { path : 'navbar', component: NavbarComponent},
  { path : 'pendientes', component: PendientesComponent},
  { path : 'chat/:reporte', component: ChatComponent},
  { path : 'finalizados', component: FinalizadosComponent},
  { path : 'cuenta', component: CuentaComponent},
  { path: 'equipos', component: EquiposComponent},
  { path: 'bitacora', component: BitacoraComponent},
  { path: 'filtrar', component: FiltrarComponent},
  { path: 'estadisticas', component: EstadisticasComponent},
  { path: 'mantenimientos', component: MantenimientosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
