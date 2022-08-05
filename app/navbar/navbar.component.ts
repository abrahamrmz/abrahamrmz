import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import * as $ from 'jQuery';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,
              private cookie: CookieService) { }

  hideSideNav = false;
  nombre = localStorage.getItem('name');
  ciudad = localStorage.getItem('ciudad');

  ngOnInit(): void {
  }

  nuevoReporte(): any{
    this.router.navigate(['/nuevo']);
  }

  misEquipos(): any{
    this.router.navigate(['/equipos']);
  }

  home(): any{
    this.router.navigate(['/reportes']).then(() => {
      window.location.reload();
    });
  }

  pendientes(): any{
    this.router.navigate(['/pendientes']).then(() => {
      window.location.reload();
    });
  }

  estadisticas(): any{
    this.router.navigate(['/estadisticas']).then(() => {
      window.location.reload();
    });
  }

  mantenimientos(): any{
    this.router.navigate(['/mantenimientos']).then(() => {
      window.location.reload();
    });
  }

  finalizados(): any{
    this.router.navigate(['/finalizados']).then(() => {
      window.location.reload();
    });
  }

  bitacora(): any{
    this.router.navigate(['/bitacora']).then(() => {
      window.location.reload();
    });
  }

  filtrar(): any{
    this.router.navigate(['/filtrar']).then(() => {
      window.location.reload();
    });
  }

  toggleSideNav(): any{
    const toggle = document.getElementById('myElement');
    if (toggle.className === 'hold-transition sidebar-mini'){
      toggle.classList.remove('hold-transition', 'sidebar-mini');
      toggle.classList.add('hold-transition', 'sidebar-collapse');
    }
    else if (toggle.className === 'hold-transition sidebar-collapse'){
      toggle.classList.remove('hold-transition', 'sidebar-collapse');
      toggle.classList.add('hold-transition', 'sidebar-mini');
    }
  }

  miCuenta(): any{
    this.router.navigate(['/cuenta']).then(() => {
      window.location.reload();
    });
  }

  logOut(): any{
    this.cookie.delete('token');
    localStorage.clear();
    this.router.navigate(['/reportes']).then(() => {
      window.location.reload();
    });
  }

}
