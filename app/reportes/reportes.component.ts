import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthServicesService } from '../services/auth-services.service';
import { Usuario } from '../interfaces/user';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit, AfterViewInit {

  token = null;

  totalR: number;
  totalE: number;
  totalP: number;
  porcentaje: number;
  ciudad = localStorage.getItem('ciudad');

  user: Usuario = {email: '', password: '', id: '', name: '', device: '',
                  token: '', action: 'ngHome', metodo: '', nivel: null, zona: localStorage.getItem('ciudad')};

  constructor(private router: Router,
              private authService: AuthServicesService) { this.token = this.authService.getToken();
                                                          this.isLog(); }

  ngOnInit(): void {
  }

  setData(): any{
    this.user.id = localStorage.getItem('nivel');
  }

  isLog(): any{
    if (!this.token){
      this.router.navigate(['/login']);
      return false;
    }
    else{
      return true;
    }
  }

  ngAfterViewInit(): any{
    this.authService.mainPage(this.user).subscribe( (response: any) => {
      this.totalR = response.totalR;
      this.totalE = response.totalE;
      this.totalP = response.totalP;
      this.porcentaje = response.porcentaje;
   });
  }

}
