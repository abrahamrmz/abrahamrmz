import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from '../services/auth-services.service';
import { Bitacora } from '../interfaces/bitacora';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit {

  fileName = 'ExcelSheet.xlsx';
  reportes: any;
  bol: boolean;
  bitacora: Bitacora = {action: 'bitacora', fechaInicio: '', fechaFinal: '', ciudad: localStorage.getItem('ciudad')};

  constructor(private auth: AuthServicesService) { }

  ngOnInit(): void {
    const todaysDate = new Date();
    const year = todaysDate.getFullYear();
    const month = ('0' + (todaysDate.getMonth() + 1)).slice(-2);
    const day = ('0' + (todaysDate.getDate() )).slice(-2);
    const minDate = (year + '-' + month + '-' + day);

    $('#fechaInicio').attr('max', minDate);
  }

  submitForm(submitBtn: HTMLButtonElement): any{
    const cal = document.getElementById('calendario');
    cal.remove();
    this.auth.generarBitacora(this.bitacora).subscribe((response: any) => {
      if (response !== false){
        this.bol = true;
        this.reportes = response;
      }
    });
  }

  exportexcel(): void
    {
       /* table id is passed over here */
       const element = document.getElementById('excel-table');
       const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
    }

}
