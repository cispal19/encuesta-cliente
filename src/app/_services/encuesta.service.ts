import { Injectable } from '@angular/core';
import { HOST_BACKEND } from '../_shared/constants';
import { HttpClient } from '@angular/common/http';
import { Encuesta } from '../_model/Encuesta';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  urlEncuesta: string = `${HOST_BACKEND}/api/encuesta`;

  mensajeRegistro = new Subject<string>();

  constructor(private httpClient: HttpClient) { }

  getEncuesta() {
    return this.httpClient.get<Encuesta[]>(`${this.urlEncuesta}/listar`);
  }

  guardarEncuesta(encuesta: Encuesta) {
    return this.httpClient.post(`${this.urlEncuesta}/registrar`,encuesta);
  }

  eliminarEncuesta(id: number) {
    return this.httpClient.delete(`${this.urlEncuesta}/eliminar/${id}`);
  }

}
