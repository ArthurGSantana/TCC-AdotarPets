import { InfoGeralService } from './shared/info-geral.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConfig } from './shared/graph.model';
import { LoginService } from 'src/app/pages/login/shared/login.service';

@Component({
  selector: 'app-informacoes-gerais',
  templateUrl: './informacoes-gerais.component.html',
  styleUrls: ['./informacoes-gerais.component.scss']
})
export class InformacoesGeraisComponent implements OnInit {

  data: any;

    chartOptions: any;

    subscription!: Subscription;

    config!: AppConfig;

    animaisTotal: number = 55;

    constructor(
        private infoService: InfoGeralService,
        private loginService: LoginService
        ) {}

    ngOnInit() {
        this.data = {
            labels: ['Cachorros','Gatos'],
            datasets: [
                {
                    data: [300, 50],
                    backgroundColor: [
                        "#B71C1C",
                        "#BDBDBD"
                    ],
                    hoverBackgroundColor: [
                        "#EF5350",
                        "#E0E0E0"
                    ]
                }
            ]
        };

        this.config = this.infoService.config;
        this.updateChartOptions();
        this.subscription = this.infoService.configUpdate$.subscribe(config => {
            this.config = config;
            this.updateChartOptions();
        });
    }

    updateChartOptions() {
        this.chartOptions = this.config && this.config.dark ? this.getDarkTheme() : this.getLightTheme();
    }

    getLightTheme() {
        return {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            }
        }
    }

    getDarkTheme() {
        return {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            }
        }
    }

}
