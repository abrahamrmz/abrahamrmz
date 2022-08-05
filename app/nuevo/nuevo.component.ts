import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServicesService } from '../services/auth-services.service';
import { Reporte } from '../interfaces/reporte';
import { Equipo } from '../interfaces/equipo';
import { Pagina } from '../interfaces/pagina';
import { ToastrService } from 'ngx-toastr';
import * as jQuery from 'jquery';
import * as firebase from 'firebase';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  @ViewChild('modelo') Modelos;

  reporteForm: FormGroup;
  token = null;
  id = localStorage.getItem('id');
  editar = false;
  mostraModelo: any;
  text = 'Sin Registros';

  validation_messages = {
    'reporta': [
      { type: 'required', message: 'Este campo es requerido' }
    ],
    'falla': [
      { type: 'required', message: 'Este campo es requerido'}
    ]
  };

  pagina: Pagina = {action: 'nuevoReporte', ciudad: localStorage.getItem('ciudad')};

  reporte: Reporte = {action: 'nReporte', reporta: '', tecnico: '', serie: '',
                      numero: null, falla: '', falla_sp: '', observaciones: '', descripcion: '', id: this.id,
                      ciudad: localStorage.getItem('ciudad'), contacto: ''};

  equipo: Equipo = {action: 'nEquipo', numero: null, serie: '', modelo: [], cliente: '', departamento: '', ubicacion: '',
                    ciudad: localStorage.getItem('ciudad'), id: this.id, idE: null, telefono: '' };

  constructor(private authService: AuthServicesService,
              private router: Router,
              private toast: ToastrService,
              private fb: FormBuilder)
 { this.token = this.authService.getToken();
   this.getDataEquipos();
   this.getDataTecnicos();
   this.getDataFallas();
  }

  public keyword = 'NombreFalla';
  public keyword2 = 'NUMERO_EQUIPO';
  public keyword3 = 'SERIE';
  public keyword4 = 'MODELO';
  public keyword5 = 'nombre';

  getFalla: any;
  getEquipo: any;
  getModelo: any;
  getTecnico: any;

  initial = 'Instalacion de consumible';
  initialEquipo = '9999';
  initialSerie = 'RZX357VF9';
  initialModelo = '306ci';
  initialTecnico = 'Pendiente de Asignar';

  public dataFalla$: Observable<any[]>;
  public dataEquipos$: Observable<any[]>;
  public dataModelos$: Observable<any[]>;
  public dataTecnicos$: Observable<any[]>;

  ngOnInit(): void {
    this.createForms();
    this.isLog();
  }

  createForms(): any{
    this.reporteForm = this.fb.group({
     reporta: ['', Validators.required],
     falla: ['', Validators.required]
    });
  }

  submitForm(submitBtn: HTMLButtonElement): any{
    submitBtn.disabled = true;
    if (this.equipo.modelo.MODELO !== undefined){
      this.equipo.modelo = this.equipo.modelo.MODELO;
    }
    console.log(this.equipo);
    if ( this.editar === true ){
      this.authService.insertarEditarEquipo(this.equipo).subscribe( response => {
        if (response.data !== null){
          this.showSuccessEquipo();
          this.reporte.numero = response.data;
          this.authService.nuevoReporte(this.reporte).subscribe( res => {
            $('.modal-backdrop').hide();
            this.router.navigate(['/pendientes']).then(() => {
            this.showSuccessReporte();
           });
        });
      }});
    }
    else{
      this.authService.nuevoReporte(this.reporte).subscribe( response => {
        if ( response.data === true){
          $('.modal-backdrop').hide();
          this.showSuccessReporte();
          this.router.navigateByUrl('/pendientes').then(() => {
        });
        }
      });
    }
  }

  getDataFallas(): void {
    this.dataFalla$ = this.authService.getAllFallas();
  }

  getDataEquipos(): void {
    this.pagina.metodo1 = 'equipos';
    this.dataEquipos$ = this.authService.getAllEquipos(this.pagina);
  }

  getDataModelos(): void {
    this.pagina.metodo1 = 'modelos';
    this.dataModelos$ = this.authService.getAllModelos(this.pagina);
  }

  getDataTecnicos(): void {
    this.pagina.metodo1 = 'tecnicos';
    this.dataTecnicos$ = this.authService.getAllTecnicos(this.pagina);
  }

  selectEventTecnicos(item: any): any {
    this.getTecnico = item;
    console.log(this.getTecnico);
  }

  selectEventModelos(item: any): any {
    this.getModelo = item;
    console.log(this.getModelo.MODELO);
  }

  selectEventFallas(item: any): any {
    this.getFalla = item;
    console.log(this.getFalla.NombreFalla);
  }

  selectEventEquipos(item: any): any {
    this.getEquipo = item;
    this.equipo.numero = this.getEquipo.NUMERO_EQUIPO;
    this.equipo.idE = this.getEquipo.ID_EQUIPO_VICTORIA;
    this.reporte.numero = this.getEquipo.ID_EQUIPO_VICTORIA;
    this.equipo.serie = this.getEquipo.SERIE;
    this.mostraModelo = this.getEquipo.MODELO;
    this.equipo.modelo = this.getEquipo.MODELO;
    this.equipo.cliente = this.getEquipo.SECRETARIA;
    this.equipo.departamento = this.getEquipo.DEPARTAMENTO;
    this.equipo.ubicacion = this.getEquipo.UBICACION;
    this.equipo.telefono = this.getEquipo.TELEFENO;
    console.log(this.equipo);
  }

  onCheckboxChange(item: any): any{
    const cli = document.getElementById('cliente');
    const dep = document.getElementById('departamento');
    const ubi = document.getElementById('ubicacion');
    const tel = document.getElementById('telefono');
    if (this.editar === true){
      this.Modelos.disabled = !this.editar;
      cli.removeAttribute('readonly');
      dep.removeAttribute('readonly');
      ubi.removeAttribute('readonly');
      tel.removeAttribute('readonly');
    }
    else{
      this.Modelos.disabled = !this.editar;
      cli.setAttribute('readonly', '');
      dep.setAttribute('readonly', '');
      ubi.setAttribute('readonly', '');
      tel.setAttribute('readonly', '');
    }
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

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  showSuccessReporte(): any{
    this.toast.success('Reporte agregado correctamente', 'Nuevo reporte');
  }

  showSuccessEquipo(): any{
    this.toast.success('El equipo se añadio o se actualizo con exito', 'Notificacion de equipo');
  }

}
