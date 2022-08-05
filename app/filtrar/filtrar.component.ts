import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from '../services/auth-services.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { Pagina } from '../interfaces/pagina';

@Component({
  selector: 'app-filtrar',
  templateUrl: './filtrar.component.html',
  styleUrls: ['./filtrar.component.css']
})
export class FiltrarComponent implements OnInit {

  reportes: any;
  bol: boolean;
  date: Date;
  resultado: string;
  pagina: Pagina = {action: 'PDF'};

  formularioContacto = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(10)]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    mensaje: new FormControl('', [Validators.required, Validators.maxLength(500)])
  });

  filtrar: any = {
    action: 'filtrar',
    fechaInicio: '',
    fechaFinal: '',
    busqueda: '',
    ciudad: localStorage.getItem('ciudad')
  };

  constructor(private auth: AuthServicesService) { }

  ngOnInit(): void {
    const todaysDate = new Date();
    const year = todaysDate.getFullYear();
    const month = ('0' + (todaysDate.getMonth() + 1)).slice(-2);
    const day = ('0' + (todaysDate.getDate() )).slice(-2);
    const minDate = (year + '-' + month + '-' + day);

    $('#fechaInicio').attr('max', minDate);
    $('#equipo').prop('required', 'required');
  }

  beforeSubmit(submitBtn: HTMLButtonElement): any{
    if (this.formularioContacto.valid){
      this.resultado = 'Todos los datos son válidos'; }
    else{
      this.resultado = 'Hay datos inválidos en el formulario';
      submitBtn.disabled = true;
     }
  }

  submitForm(submitBtn: HTMLButtonElement): any {
    const alert = $('#alert');
    alert.css('display', 'hidden');
    submitBtn.disabled = true;
    this.filtrar.action = 'filtrar';
    this.auth.verBitacoraEquipo(this.filtrar).subscribe((response: any ) => {
      if (response.length > 0){
        this.reportes = response;
        this.bol = true;
        console.log(response);
        submitBtn.disabled = false;
      }
      else{
        this.bol = false;
        alert.css('display', 'block');
        submitBtn.disabled = false;
      }
    });
  }

  descargarPDFs(): any{
    this.filtrar.action = 'PDFS';
    this.auth.generarPDF(this.filtrar).subscribe((response: any) => {
      const fileURL = URL.createObjectURL(response);
      window.open(fileURL);
    });
  }

  generarPDF(numero): any{
    this.pagina.metodo1 = numero;
    this.auth.generarPDF(this.pagina).subscribe((response: any) => {
      const fileURL = URL.createObjectURL(response);
      window.open(fileURL);
    });
  }

}
