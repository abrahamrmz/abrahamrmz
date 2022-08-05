import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AuthServicesService } from '../services/auth-services.service';
import { Pagina } from '../interfaces/pagina';
import { UpdateReporte } from '../interfaces/update-reporte';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-finalizados',
  templateUrl: './finalizados.component.html',
  styleUrls: ['./finalizados.component.css']
})
export class FinalizadosComponent implements OnInit {

  results: Object;
  tiempo: any;
  updateR: UpdateReporte = {action: 'reabrirR', reporte: null, tecnico: null, id: localStorage.getItem('id'), SOLUCION: '', OBSERVACIONES: '', DESCRIPCION: '' };
  pagina: Pagina = {action: 'BuscarF', ciudad: localStorage.getItem('ciudad')};
  searchTerm$ = new Subject<string>();

  constructor(private auth: AuthServicesService,
              private toast: ToastrService) {
    this.auth.search(this.searchTerm$, this.pagina)
      .subscribe((results: any) => {
        console.log(results);
        this.results = results.results;
      });
   }

  ngOnInit(): void {
  }

  showSuccess(reporte): any {
    this.toast.success('Reporte: ' + reporte + ' reabierto con exito', 'Reporte');
  }

  showDanger(): any{
    this.toast.error('Ocurrio un error informe al administrador', 'Error');
  }

  reabrirReporte(reporte): any {
    this.updateR.reporte = reporte;
    this.auth.reabrirReporte(this.updateR).subscribe((response: any) => {
      if (response.data === true){
        this.showSuccess(reporte);
      }
      else {
        this.showDanger();
      }
    });
  }

  generarPDF(reporte): any{
    this.pagina.action = 'PDF';
    this.pagina.metodo1 = reporte;
    this.auth.generarPDF(this.pagina).subscribe( (response: any) => {
      console.log(response);
      this.pagina.action = 'BuscarF';
      const fileURL = URL.createObjectURL(response);
      window.open(fileURL);
    });
  }

}
