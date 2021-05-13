import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  estados: string[] = ["Minas Gerais", "Rio de Janeiro", "São Paulo"];
  
}
