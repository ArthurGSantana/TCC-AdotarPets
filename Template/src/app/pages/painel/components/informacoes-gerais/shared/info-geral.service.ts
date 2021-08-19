import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppConfig } from './graph.model';

@Injectable({
  providedIn: 'root'
})
export class InfoGeralService {

  config: AppConfig = {
    theme: 'saga-blue',
    dark: false,
    inputStyle: 'outlined',
    ripple: true
  };

  private configUpdate = new Subject<AppConfig>();
  configUpdate$ = this.configUpdate.asObservable();

  constructor() { }

  updateConfig(config: AppConfig) {
    this.config = config;
    this.configUpdate.next(config);
  }

  getConfig() {
    return this.config;
  }

}
