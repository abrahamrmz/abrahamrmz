import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthServicesService } from '../services/auth-services.service';
import { Pagina } from '../interfaces/pagina';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements AfterViewInit, OnInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false})

  dtElement: DataTableDirective;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 0;
  loading: boolean;

  results: Object;
  searchTerm$ = new Subject<string>();

  isDtInitialized = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  pagina: Pagina = {action: 'Equipos', metodo2: localStorage.getItem('ciudad')};
  equipos: any;
  modelos: any;

  selectEquipo = {
    action: 'editarEquipo',
    id: localStorage.getItem('id'),
    idE: 0,
    numero: 0,
    cliente: '',
    ubicacion: '',
    departamento: '',
    direccion: '',
    serie: '',
    modelo: ''
  };

  nuevoEquipo = {
    action: 'verEquipo',
    numero: '',
    id: localStorage.getItem('id'),
    idE: 0,
    cliente: '',
    ubicacion: '',
    departamento: '',
    direccion: '',
    serie: '',
    modelo: '',
    ciudad: localStorage.getItem('ciudad'),
    zona: localStorage.getItem('ciudad')
  };

  constructor(private auth: AuthServicesService,
              private toast: ToastrService)
  {this.retrieveEquipos(); }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20
    };
  }

  ngAfterViewInit(): void{

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  retrieveEquipos(): any{
    this.auth.getEquipos(this.pagina).subscribe(response => {
      this.equipos = response;
      this.dtTrigger.next();
      this.pagina.action = 'Modelos';
      this.auth.getAllModelos(this.pagina).subscribe((res: any) => {
        this.modelos = res;
      });
    });
  }

  openModal(id, numero, cliente, ubicacion, departamento, direccion, serie, modelo): any{
    this.selectEquipo.idE = id;
    this.selectEquipo.numero = numero;
    this.selectEquipo.cliente = cliente;
    this.selectEquipo.ubicacion = ubicacion;
    this.selectEquipo.departamento = departamento;
    this.selectEquipo.direccion = direccion;
    this.selectEquipo.serie = serie;
    this.selectEquipo.modelo = modelo;
  }

  verEquipo(event): any{
    this.mode = 'indeterminate';
    this.value = 50;
    const button = $('#new_save');
    const p = $('#equipoExiste');
    if (this.nuevoEquipo.numero.length >= 3){
    this.searchTerm$.next(event);
    this.auth.search(this.searchTerm$, this.nuevoEquipo).subscribe((results: any) => {
      if (results){
        button.prop('disabled', true);
        p.css('display', 'block');
        this.value = 0;
        this.mode = 'determinate';
        this.results = results.results;
      }
      else{
        button.prop('disabled', false);
        p.css('display', 'none');
      }
      });
    }
  }

  showSuccessReporte(msg): any{
    this.toast.success(msg, 'Equipo');
  }

  submitForm(): any{
    this.auth.insertarEditarEquipo(this.selectEquipo).subscribe((response: any) => {
      if (response){
        this.pagina.action = 'Equipos';
        this.rerender();
        this.showSuccessReporte('Equipo editado correctamente');
      }
    });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.retrieveEquipos();
    });
  }

  submitFormEquip(submitBtn: HTMLButtonElement): any{
    submitBtn.disabled = true;
    this.nuevoEquipo.action = 'nEquipo';
    this.auth.insertarEditarEquipo(this.nuevoEquipo).subscribe((response: any) => {
      this.nuevoEquipo.action = 'verEquipo';
      this.pagina.action = 'Equipos';
      console.log(response);
      this.rerender();
      this.showSuccessReporte('Equipo agregado correctamente');
    });
  }
}
