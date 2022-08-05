import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagina } from '../interfaces/pagina';
import { AuthServicesService } from '../services/auth-services.service';
import { Mensaje } from '../interfaces/mensaje';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  tipo = localStorage.getItem('nivel');
  nombre = localStorage.getItem('name');

  reporte: Pagina = {action: 'chats'};
  mensaje: Mensaje = {action: 'nuevoMensaje', mensaje: '', reporte: '', tipo: this.tipo, nombre: this.nombre };
  chats: any;

  constructor(private activatedRoute: ActivatedRoute,
              private auth: AuthServicesService) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.reporte.metodo1 = params.get('reporte');
      this.mensaje.reporte = this.reporte.metodo1;
    });
   }

  ngOnInit(): void {
  }

  retrieveMensajes(): any{
    this.auth.getMensajesReporte(this.reporte).subscribe( (response: any) => {
      this.chats = response.chats;
    });
  }

  submitForm(): any{
    const formData = new FormData();
    formData.append('mensaje', this.mensaje.mensaje);
    formData.append('tipo', this.tipo);
    formData.append('nombre', this.nombre);
    formData.append('reporte', this.reporte.metodo1);
    formData.append('action', 'nuevoMensaje');
    formData.append('archivo', this.mensaje.archivo);
    this.auth.nuevoMensaje(formData).subscribe( (response: any) => {
      console.log(response);
      this.mensaje.mensaje = '';
      this.retrieveMensajes();
    });
  }

  onFileSelect(event): any {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.mensaje.archivo = file;
      console.log(this.mensaje);
    }
  }

  ngAfterViewInit(): void{
    this.retrieveMensajes();
  }

  verArchivo(reporte, archivo): any{
    reporte = btoa(reporte);
    archivo = btoa(archivo);
    window.open('https://grupogestiondocumental.com.mx/Y29uc3VsdGFkZWFyY2hpdm9z/archivo.php?id=' + reporte + '&file=' + archivo);
  }

}
