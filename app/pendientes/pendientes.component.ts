import { Component, OnInit, ViewChild} from '@angular/core';
import { Pagina } from '../interfaces/pagina';
import { AuthServicesService } from '../services/auth-services.service';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { UpdateReporte } from '../interfaces/update-reporte';
import { from, Observable } from 'rxjs';
import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { Piezas } from '../interfaces/piezas';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.css'],
  providers: [NgbPopoverConfig]
})
export class PendientesComponent implements OnInit {

  @ViewChild('myInput', {static: false}) myInput: ElementRef;
  id = localStorage.getItem('id');
  text = 'Sin Registros';
  pagina: Pagina = {action: 'pendientesHome', ciudad: localStorage.getItem('ciudad')};
  updateR: UpdateReporte = {action: 'updateReporte', reporte: null, tecnico: null, id: this.id,
                             estatus: 'P', SOLUCION: '', OBSERVACIONES: '', DESCRIPCION: '', DIAGNOSTICO: ''};
  reportes: Array<any>;
  solucion: string;
  descripcion: string;
  observaciones: string;
  diagnostico: string;
  negro: number;
  cyan: number;
  magenta: number;
  yellow: number;
  contadorBN: number;
  contadorC: number;
  escaner: number;
  public keyword = 'nombre';
  getTecnico: any;
  initialTecnico = 'Pendiente de Asignar';
  dataTecnicos: any[] = [];
  piezas: Piezas = { action: 'piezas' };
  counter = 1;

  constructor(private auth: AuthServicesService,
              private config: NgbPopoverConfig,
              private router: Router,
              private toast: ToastrService) {
                config.placement = 'right';
                config.triggers = 'hover';
               }

  ngOnInit(): void {
    // this.retrievePendientes();
  }

  agregarPieza(reporte): any{
    let datos;
    this.piezas.reporte = reporte;
    this.reportes.forEach(element => {
      if (element.NUMERO === reporte) {
         datos = element;
      }
    });
    // console.log(datos.CANTIDAD_PIEZA_1);
    if (this.counter > 5){
          alert('El numero maximo de refacciones es 5');
          return false;
    }

    this.piezas.cantPieza1 = datos.CANTIDAD_PIEZA_1;
    this.piezas.cantPieza2 = datos.CANTIDAD_PIEZA_2;
    this.piezas.cantPieza3 = datos.CANTIDAD_PIEZA_3;
    this.piezas.cantPieza4 = datos.CANTIDAD_PIEZA_4;
    this.piezas.cantPieza5 = datos.CANTIDAD_PIEZA_5;

    this.piezas.numPieza1 = datos.NUM_PARTE_PIEZA_1;
    this.piezas.numPieza2 = datos.NUM_PARTE_PIEZA_2;
    this.piezas.numPieza3 = datos.NUM_PARTE_PIEZA_3;
    this.piezas.numPieza4 = datos.NUM_PARTE_PIEZA_4;
    this.piezas.numPieza5 = datos.NUM_PARTE_PIEZA_5;

    this.piezas.nombrePieza1 = datos.NOMBRE_PIEZA_1;
    this.piezas.nombrePieza2 = datos.NOMBRE_PIEZA_2;
    this.piezas.nombrePieza3 = datos.NOMBRE_PIEZA_3;
    this.piezas.nombrePieza4 = datos.NOMBRE_PIEZA_4;
    this.piezas.nombrePieza5 = datos.NOMBRE_PIEZA_5;

    // tslint:disable-next-line: max-line-length
    const piezasCant = ['', this.piezas.cantPieza1, this.piezas.cantPieza2, this.piezas.cantPieza3, this.piezas.cantPieza4, this.piezas.cantPieza5];
    // tslint:disable-next-line: max-line-length
    const piezasNum = ['', this.piezas.numPieza1, this.piezas.numPieza2, this.piezas.numPieza3, this.piezas.numPieza4, this.piezas.numPieza5];
    // tslint:disable-next-line: max-line-length
    const piezasNombre = ['', this.piezas.nombrePieza1, this.piezas.nombrePieza2, this.piezas.nombrePieza3, this.piezas.nombrePieza4, this.piezas.nombrePieza5];

    const newTextBoxDiv = $(document.createElement('div'))
        .attr('id', 'piezas' + this.counter);
    newTextBoxDiv.after().html('<div class="row justify-content-around"><div class="col-3"><label position="floating">Cantidad</label><input value="' + piezasCant[this.counter] + '"  id="cantidadPieza' + this.counter + '" name="cantidadPieza' + this.counter + '" [(ngModel)]="piezas.cantPieza' + this.counter + '" type="text" class="form-control"></div><div class="col-3"><label position="floating"># Parte</label><input value="' + piezasNum[this.counter] + '" class="form-control" id="partePieza' + this.counter + '" name="partePieza' + this.counter + '" [(ngModel)])="piezas.numPieza' + this.counter + '" type="text" enterkeyhint="next"></div><div class="col-3"><label position="floating">Nombre</label><input value="' + piezasNombre[this.counter] + '" class="form-control" id="nombrePieza' + this.counter + '" name="nombrePieza' + this.counter + '" [(ngModel)]="piezas.nombrePieza' + this.counter + '" type="text"><div></div>');

    newTextBoxDiv.appendTo('#prueba');

    this.counter++;
    // console.log(e);
    console.log(this.piezas);
  }

  trackByFn(index, item) {
    // console.log(item);
    return item;
  }

  retrievePendientes(): any{
    this.pagina.action = 'pendientesHome';
    this.auth.getAllPendientes(this.pagina).subscribe( (response: any ) => {
      console.log(response);
      this.getDataTecnicos();
      this.reportes = response.reportes;
    });
  }

  getDataTecnicos(): void {
    this.pagina.action = 'tecnicos';
    this.auth.getAllTecnicos(this.pagina).subscribe((response: any) => {
      this.dataTecnicos = response;
    });
  }

  selectEventTecnicos(item: any): any {
    this.getTecnico = item.id_tecnico;
    console.log(this.getTecnico);
    this.updateR.tecnico = this.getTecnico;
  }

  showSuccess(reporte): any{
    this.toast.success('Reporte: ' + reporte + ' finalizado con exito', 'Reporte');
  }

  checkbox(event): any{
    const val = event.target.checked;
    if (val === true){
      this.updateR.estatus = 'S';
    }
    else if (val !== true){
      this.updateR.estatus = 'P';
    }
    console.log(this.updateR.estatus);
  }

  submitForm(finalizado?: boolean): any {

    let nombre = [];
    let numero  = [];
    let cantidad = [];
    for (let i = 1; i <= 5; i++){
      cantidad[i] = $('#cantidadPieza' + i).val();
      nombre[i] = $('#nombrePieza' + i).val();
      numero[i] = $('#partePieza' + i).val();
      // console.log(cantidad + ' ' +  numero + ' ' + nombre);
      if (i === 1){
        if (cantidad[i] === null || cantidad[i] === undefined || cantidad[i] === '' ||
        cantidad[i] === 'null' || numero[i] === null || numero[i] === undefined || numero[i] === '' ||
        numero[i] === 'null' || nombre[i] === null || nombre[i] === undefined || nombre[i] === '' ||
        nombre[i] === 'null'){
          this.piezas.cantPieza1 = this.piezas.cantPieza1;
          this.piezas.numPieza1 = this.piezas.numPieza1;
          this.piezas.nombrePieza1 = this.piezas.nombrePieza1;
        }
        else{
          this.piezas.cantPieza1 = $('#cantidadPieza' + i).val();
          this.piezas.numPieza1 = $('#partePieza' + i).val();
          this.piezas.nombrePieza1 = $('#nombrePieza' + i).val();
        }
      }
      else if (i === 2){
        if (cantidad[i] === null || cantidad[i] === undefined || cantidad[i] === '' ||
        cantidad[i] === 'null' || numero[i] === null || numero[i] === undefined || numero[i] === '' ||
        numero[i] === 'null' || nombre[i] === null || nombre[i] === undefined || nombre[i] === '' ||
        nombre[i] === 'null'){
          this.piezas.cantPieza2 = this.piezas.cantPieza2;
          this.piezas.numPieza2 = this.piezas.numPieza2;
          this.piezas.nombrePieza2 = this.piezas.nombrePieza2;
        }
        else{
          this.piezas.cantPieza2 = $('#cantidadPieza' + i).val();
          this.piezas.numPieza2 = $('#partePieza' + i).val();
          this.piezas.nombrePieza2 = $('#nombrePieza' + i).val();
        }
      }
      else if (i === 3){
        if (cantidad[i] === null || cantidad[i] === undefined || cantidad[i] === '' ||
        cantidad[i] === 'null' || numero[i] === null || numero[i] === undefined || numero[i] === '' ||
        numero[i] === 'null' || nombre[i] === null || nombre[i] === undefined || nombre[i] === '' ||
        nombre[i] === 'null'){
          this.piezas.cantPieza3 = this.piezas.cantPieza3;
          this.piezas.numPieza3 = this.piezas.numPieza3;
          this.piezas.nombrePieza3 = this.piezas.nombrePieza3;
        }
        else{
          this.piezas.cantPieza3 = $('#cantidadPieza' + i).val();
          this.piezas.numPieza3 = $('#partePieza' + i).val();
          this.piezas.nombrePieza3 = $('#nombrePieza' + i).val();
        }
      }
      else if (i === 4){
        if (cantidad[i] === null || cantidad[i] === undefined || cantidad[i] === '' ||
        cantidad[i] === 'null' || numero[i] === null || numero[i] === undefined || numero[i] === '' ||
        numero[i] === 'null' || nombre[i] === null || nombre[i] === undefined || nombre[i] === '' ||
        nombre[i] === 'null'){
          this.piezas.cantPieza4 = this.piezas.cantPieza4;
          this.piezas.numPieza4 = this.piezas.numPieza4;
          this.piezas.nombrePieza4 = this.piezas.nombrePieza4;
        }
        else{
          this.piezas.cantPieza4 = $('#cantidadPieza' + i).val();
          this.piezas.numPieza4 = $('#partePieza' + i).val();
          this.piezas.nombrePieza4 = $('#nombrePieza' + i).val();
        }
      }
      else if (i === 5){
        if (cantidad[i] === null || cantidad[i] === undefined || cantidad[i] === '' ||
        cantidad[i] === 'null' || numero[i] === null || numero[i] === undefined || numero[i] === '' ||
        numero[i] === 'null' || nombre[i] === null || nombre[i] === undefined || nombre[i] === '' ||
        nombre[i] === 'null'){
          this.piezas.cantPieza5 = this.piezas.cantPieza5;
          this.piezas.numPieza5 = this.piezas.numPieza5;
          this.piezas.nombrePieza5 = this.piezas.nombrePieza5;
        }
        else{
          this.piezas.cantPieza5 = $('#cantidadPieza' + i).val();
          this.piezas.numPieza5 = $('#partePieza' + i).val();
          this.piezas.nombrePieza5 = $('#nombrePieza' + i).val();
        }
      }
      // console.log(this.piezas);
    }

    /*
    this.piezas.cantPieza1 = $('#cantidadPieza1').val();
    this.piezas.cantPieza2 = $('#cantidadPieza2').val();
    this.piezas.cantPieza3 = $('#cantidadPieza3').val();
    this.piezas.cantPieza4 = $('#cantidadPieza4').val();
    this.piezas.cantPieza5 = $('#cantidadPieza5').val();

    this.piezas.nombrePieza1 = $('#nombrePieza1').val();
    this.piezas.nombrePieza2 = $('#nombrePieza2').val();
    this.piezas.nombrePieza3 = $('#nombrePieza3').val();
    this.piezas.nombrePieza4 = $('#nombrePieza4').val();
    this.piezas.nombrePieza5 = $('#nombrePieza5').val();

    this.piezas.numPieza1 = $('#partePieza1').val();
    this.piezas.numPieza2 = $('#partePieza2').val();
    this.piezas.numPieza3 = $('#partePieza3').val();
    this.piezas.numPieza4 = $('#partePieza4').val();
    this.piezas.numPieza5 = $('#partePieza5').val();
    */

    this.updateR.action = 'updateReporte';
    this.updateR.SOLUCION = this.solucion;
    this.updateR.DESCRIPCION = this.descripcion;
    this.updateR.OBSERVACIONES = this.observaciones;
    this.updateR.DIAGNOSTICO = this.diagnostico;
    this.updateR.contadorBN = this.contadorBN;
    this.updateR.contadorC = this.contadorC;
    this.updateR.contadorESC = this.escaner;
    this.updateR.P_NEGRO = this.negro;
    this.updateR.P_CYAN = this.cyan;
    this.updateR.P_MAGENTA = this.magenta;
    this.updateR.P_YELLOW = this.yellow;
    this.auth.updateTecnico(this.updateR).subscribe( response => {
      if (response.data === true){
        this.auth.insertarPiezas(this.piezas).subscribe( rep => {
        this.updateR.estatus = 'P';
        $('body').removeClass('modal-open');
        $('.modal-backdrop').hide();
        this.retrievePendientes();
        if (finalizado === true){
          this.cancelarReporte();
        }
      });
     }
    });
  }

  sentNumero(numero): any{
    this.updateR.reporte = numero;
  }

  // tslint:disable-next-line: max-line-length
  actualizar(numero, observaciones: string, solucion: string, descripcion: string, diagnostico: string, bn: number, color: number, escaner: number, n: number, c: number, m: number, y: number): any{
    document.getElementById('prueba').outerHTML = '';
    const newTextBoxDiv = $(document.createElement('div')).attr('id', 'prueba');
    newTextBoxDiv.appendTo('#divPiezas');
    this.counter = 1;
    this.updateR.reporte = numero;
    this.observaciones = observaciones;
    this.updateR.OBSERVACIONES = observaciones;
    this.solucion = solucion;
    this.descripcion = descripcion;
    this.diagnostico = diagnostico;
    this.contadorBN  = bn;
    this.contadorC = color;
    this.escaner = escaner;
    this.negro = n;
    this.cyan = c;
    this.magenta = m;
    this.yellow = y;
  }

  ordenar(event): any{
    if (event === 'tecnico'){
      this.reportes.sort((a, b ) => a.NOMBRE.localeCompare(b.NOMBRE));
      this.ngOnInit();
    }
    else if (event === 'cliente'){
      this.reportes.sort((a, b ) => a.CLIENTE.localeCompare(b.CLIENTE));
      this.ngOnInit();
    }
    else if (event === 'fechaR'){
      this.reportes.sort((a, b ) => b.NUMERO - a.NUMERO);
      this.ngOnInit();
    }
    else if (event === 'fechaA'){
      this.reportes.sort((a, b ) => a.NUMERO - b.NUMERO);
      this.ngOnInit();
    }
  }

  cancelarReporte(): any{
    this.updateR.action = 'cancelarR';
    this.auth.cancelarReporte(this.updateR).subscribe((response: any) => {
      if (response.data === true){
        this.retrievePendientes();
        this.showSuccess(this.updateR.reporte);
        $('.modal-backdrop').hide();
      }
    });
  }

  eliminarReporte(): any{
    this.updateR.action = 'eliminarR';
    this.auth.cancelarReporte(this.updateR).subscribe((response: any) => {
      if (response.data === true){
        this.retrievePendientes();
        this.showSuccess(this.updateR.reporte);
        $('.modal-backdrop').hide();
      }
    });
  }

  generarPDF(reporte): any{
    this.pagina.action = 'PDF';
    this.pagina.metodo1 = reporte;
    this.auth.generarPDF(this.pagina).subscribe( (response: any) => {
      // console.log(response);

      const fileURL = URL.createObjectURL(response);
      window.open(fileURL);
    });
  }

  ngAfterViewInit(): void{
    this.retrievePendientes();
  }
}
