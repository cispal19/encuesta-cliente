import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EleccionService {

  listELeccion: any = [];
  constructor(private http: HttpClient) {
    this.cargarEleccion();
   }

    cargarEleccion() {
     this.http.get('assets/data/eleccion.json').subscribe( (res) => {
       this.listELeccion = res;
       console.log(this.listELeccion);
     });
   }
}
