import { PetsModel } from './../../../shared/interfaces/Pets.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private firebase: AngularFireDatabase
  ) { }

  estados: string[] = ["São Paulo"];
  cidades: string[] = ["Batatais", "São Joaquim da Barra"];
  especies: string[] = ["Cachorro", "Gato"];
  portes: string[]= ["Pequeno", "Médio", "Grande"];
  sexo: string[] = ["Fêmea", "Macho"];
  all: string[] = ["Não, já sei o que eu quero!", "Sim, me mostre todos!"];

  getAllPets(): Observable<any[]> {
    return this.firebase.list<any>('animais').valueChanges();
  };

  createNewPet(pet: PetsModel): any{
    return this.firebase.list<any>('animais').push(pet);
  };

  getNotification(obj: string): Observable<any[]> {
    return this.firebase.object<any>(`notificacoes/${obj}`).valueChanges();
  };

  createNotification(obj: any, path: string): any{
    return this.firebase.list<any>(`notificacoes/${path}`).push(obj);
  };

  getUsers(): Observable<any[]> {
    return this.firebase.list<any>('usuarios').valueChanges();
  };

  updateActive(obj: any, path: string, key: any): Promise<any>{
    return this.firebase.object<any>(`notificacoes/${path}/${key}`).update(obj);
  };

  deleteNotification(path: string, key: any): Promise<any> {
    return this.firebase.object<any>(`notificacoes/${path}/${key}`).remove();
  };

}
