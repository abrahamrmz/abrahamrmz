import { Component, OnInit } from '@angular/core';
import { Usuario} from '../interfaces/user';
import { AuthServicesService } from '../services/auth-services.service';
import { Alert } from '../interfaces/alert';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private authService: AuthServicesService,
               private router: Router,
               private cookie: CookieService,
               private toast: ToastrService) { }

  user: Usuario = {email: '', password: '', id: '', name: '', device: '',
                  token: '', action: '', metodo: '', nivel: null, zona: ''};

  alerts: Alert[];
  message = null;
  recuerdame: boolean;
  helper = new JwtHelperService();

  ngOnInit(): void {
    this.isLogged();
  }

  recordar(event): any{
    this.recuerdame = event;
    if (this.recuerdame === true){
      this.cookie.set('user', this.user.email, {expires: 30});
    }
  }

  login(): any {
    this.user.action = 'login';
    this.authService.loginForm(this.user).subscribe((response: any) => {
      if (response.status === 'success' && response.nivel === '2') {
        this.authService.setUser(response);
      }
      else if (response.status === 'success' && response.nivel === '1'){
        this.showWarning();
      }
      else {
        this.message = 'Los datos propocionados son incorrectos';
      }
    });
  }

  isLogged(): any {
    const token = this.cookie.get('token');
    if (token){
      this.router.navigate(['/reportes']);
    }
  }

  retrievePass(user): any{
    this.user.action = 'forgotP';
    this.user.email = user;
    this.authService.retrievePass(this.user).subscribe((response: any) => {
      if (response.status === true){
        this.showSuccessPassword();
      }
      else{
        this.showDanger();
      }
    });
  }

  showSuccessPassword(): any{
    this.toast.success('Se envio un correo a su direccion con la contrasena', 'Nuevo correo');
  }

  showDanger(): any {
    this.toast.error('Algo ocurrio, compruebe su usuario e intente de nuevo', 'Error');
  }

  showWarning(): any{
    this.toast.warning('Por favor utiliza la apliacion para ingresar al sistema');
  }
}
