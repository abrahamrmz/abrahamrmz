import { Component, OnInit } from '@angular/core';
import { Password } from '../interfaces/password';
import { AuthServicesService } from '../services/auth-services.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {

  _password: Password = {action: 'updatePass', password: null, pass1: null, pass2: null, id: localStorage.getItem('id') };

  password: string;
  pass1: string;
  pass2: string;

  constructor(private auth: AuthServicesService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    const button = $('#button');
    console.log(this.pass1);
    button.prop('disabled', true);
  }

  checkPassword(): any{
    const button = $('#button');
    if (this.pass1 !== this.pass2 || this.pass1 === undefined || this.pass2 === undefined){
      button.prop('disabled', true);
    }
    else if ( this.pass1 === this.pass2){
      button.prop('disabled', false);
    }
  }

  comparePasswords(): any{
    const alert = $('#result');
    if (this.pass1 !== this.pass2 || this.pass2 !== this.pass1) {
      alert.text('Las contraseñas no coinciden');
      alert.css('display', 'block');
    }
    else {
      alert.css('display', 'none');
    }
  }

  submit(): any{
    this._password.password = this.password;
    this._password.pass1 = this.pass1;
    this._password.pass2 = this.pass2;
    console.log(this._password);
    this.auth.updatePassword(this._password).subscribe( (response: any) => {
      if (response.status === true){
        this.router.navigate(['/reportes']).then(() => {
          this.showSuccess();
        });
      }
      else if (response.status === false){
        this.showDanger();
      }
    });
  }

  showSuccess(): any {
    this.toastr.success('La contrasena se actualizo con exito', 'Nueva Notificacion');
  }

  showDanger(): any {
    this.toastr.error('Algo ocurrio, compruebe su contrasena e intente de nuevo', 'Error');
  }

}
