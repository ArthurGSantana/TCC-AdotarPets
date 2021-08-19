import { InfoGeralService } from './shared/info-geral.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConfig } from './shared/graph.model';

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

    constructor(private infoService: InfoGeralService) {}

    ngOnInit() {
        this.data = {
            labels: ['A','B','C'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        "#42A5F5",
                        "#66BB6A",
                        "#FFA726"
                    ],
                    hoverBackgroundColor: [
                        "#64B5F6",
                        "#81C784",
                        "#FFB74D"
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
