import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthServicesService } from '../services/auth-services.service';
import { Pagina } from '../interfaces/pagina';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit, AfterViewInit {

  pagina: Pagina = {action: 'estadisticas', ciudad: localStorage.getItem('ciudad')};

  data: any;
  data2: any;
  basicOptions: any;
  config: any;

  constructor(private auth: AuthServicesService) {}

  ngOnInit(): void {
  }

  update(event: Event) {
    this.data;
  }

  ngAfterViewInit(): void {
    this.misEstadisticas();
  }

  misEstadisticas(): any{
    this.auth.getEstadisticas(this.pagina).subscribe((response: any) => {
      this.data = response.mantenimiento;
      const nombres = [];
      const total = [];
      console.log(this.data);
      for (const item of this.data ){
        console.log(item.nombre);
        nombres.push(item.nombre);
        total.push(item.total);
      }
      this.data2 = {
        labels: nombres,
        datasets: [
            {
                label: 'Mantenimientos',
                data: total,
                backgroundColor: '#42A5F5',
            }
        ]};
    });
  }

  updateChartOptions(): any {
    if (this.config.dark) {
        this.applyDarkTheme();
    }
    else {
        this.applyLightTheme();
    }
}

applyDarkTheme(): any {
    this.basicOptions = {
        legend: {
            labels: {
                fontColor: '#ebedef'
            }
        },
        scales: {
            xAxes: [{
                ticks: {
                    fontColor: '#ebedef'
                },
                gridLines: {
                    color: 'rgba(255,255,255,0.2)'
                }
            }],
            yAxes: [{
                ticks: {
                    fontColor: '#ebedef'
                },
                gridLines: {
                    color: 'rgba(255,255,255,0.2)'
                }
            }]
        }
    };
  }

  applyLightTheme(): any {
    this.basicOptions = {
        legend: {
            labels: {
                fontColor: '#495057'
            }
        },
        scales: {
            xAxes: [{
                ticks: {
                    fontColor: '#495057'
                }
            }],
            yAxes: [{
                ticks: {
                    fontColor: '#495057'
                }
            }]
        }
    };
  }

}
