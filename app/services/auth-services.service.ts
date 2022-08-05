import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Usuario } from '../interfaces/user';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';
import { catchError, retry, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  constructor( private router: Router,
               private http: HttpClient,
               private cookie: CookieService) { }

  basePath = 'https://grupogestiondocumental.com.mx/backend0/';
  queryUrl: string = '?search=';

  private URL_API = 'https://grupogestiondocumental.com.mx/reportes/apiroute.php';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // tslint:disable-next-line: object-literal-key-quotes
      'Accept': 'application/json'
       })

  };

  loginForm( data: any ): Observable<any> {
    return this.http.post(this.basePath + 'API_CHI.php', JSON.stringify(data), this.httpOptions);
  }

  setUser( resp ): any {
    this.cookie.set('token', resp.access_token); // activar secure en host
    localStorage.setItem('name', resp.name);
    // localStorage.setItem('access_token', resp.access_token);
    localStorage.setItem('id', resp.id);
    localStorage.setItem('nivel', resp.nivel);
    localStorage.setItem('ciudad', resp.zona);
    console.log(resp);
    this.router.navigate(['/reportes']);
  }

  getToken(): any{
    return this.cookie.get('token');
  }

  mainPage( data: Usuario ): any {
    return this.http.post(this.basePath + 'API_CHI.php', JSON.stringify(data), this.httpOptions);
  }

  getAllFallas(): Observable<any[]> {
    return this.http.get<any[]>(this.URL_API);
  }

  getAllEquipos(data): Observable<any[]> {
    return this.http.post<any[]>(this.basePath + 'API_CHI.php', JSON.stringify(data), this.httpOptions);
  }

  getAllModelos(data): Observable<any[]> {
    return this.http.post<any[]>(this.basePath + 'API_CHI.php', JSON.stringify(data), this.httpOptions);
  }

  getAllTecnicos(data): Observable<any[]> {
    return this.http.post<any[]>(this.basePath + 'API_CHI.php', JSON.stringify(data), this.httpOptions);
  }

  nuevoReporte(data): any{
    return this.http.post(this.basePath + 'API_CHI.php', JSON.stringify(data), this.httpOptions);
  }

  insertarEditarEquipo(data): any {
    return this.http.post(this.basePath + 'API_CHI.php', JSON.stringify(data), this.httpOptions);
  }

  getAllPendientes(data): Observable<any[]> {
    return this.http.post<any[]>(this.basePath + 'API_CHI.php', JSON.stringify(data), this.httpOptions);
  }

  updateTecnico(data): any {
    return this.http.post(this.basePath + 'API_CHI.php', JSON.stringify(data), this.httpOptions);
  }

  getMensajesReporte(data): Observable<any[]>{
    return this.http.post<any[]>(this.basePath + 'API_CHI.php', JSON.stringify(data), this.httpOptions);
  }

  nuevoMensaje(data): any {
    return this.http.post<any>(this.basePath + 'API_CHI.php', data);
  }

  cancelarReporte(data): any {
    return this.http.post<any>(this.basePath + 'API_CHI.php', data);
  }

  reabrirReporte(data): any {
    return this.http.post<any>(this.basePath + 'API_CHI.php', JSON.stringify(data));
  }

  updatePassword(data): any{
    return this.http.post<any>(this.basePath + 'API_CHI.php', JSON.stringify(data));
  }

  retrievePass(data): any{
    return this.http.post<any>(this.basePath + 'API_CHI.php', JSON.stringify(data));
  }

  getEquipos(data): any{
    return this.http.post<any>(this.basePath + 'API_CHI.php', JSON.stringify(data));
  }

  verEquipo(data): any{
    return this.http.post<any>(this.basePath + 'API_CHI.php', JSON.stringify(data));
  }

  generarBitacora(data): any{
    return this.http.post<any>(this.basePath + 'API_CHI.php', JSON.stringify(data));
  }

  verBitacoraEquipo(data): any{
    return this.http.post<any>(this.basePath + 'API_CHI.php', JSON.stringify(data));
  }

  insertarPiezas(data): any{
    return this.http.post<any>(this.basePath + 'API_CHI.php', JSON.stringify(data));
  }

  getEstadisticas(data): any{
    return this.http.post<any>(this.basePath + 'API_CHI.php', JSON.stringify(data));
  }

  generarPDF(data): any{
    return this.http.post<any>(this.basePath + 'API_CHI.php', JSON.stringify(data), {responseType: 'blob' as 'json'}).pipe( map((result:HttpResponse<Blob>) => {
      console.log(result);
      // saveAs(result, 'Quotation.pdf');
      return result;
    }));
  }

  search(terms: Observable<string>, data: any): any {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term, data));
  }

  searchEntries(term, data: any): any {
    return this.http
        .post(this.basePath  + 'API_CHI.php' + this.queryUrl + term, JSON.stringify(data))
        .map(res => res);
  }
}
