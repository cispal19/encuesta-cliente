import { Component, OnInit } from '@angular/core';
import { EncuestaService } from '../../../_services/encuesta.service';
import { Encuesta } from '../../../_model/Encuesta';
import { EleccionService } from '../../../_services/eleccion.service';
import { Eleccion } from '../../../_model/Eleccion';

@Component({
  selector: 'app-nueva-encuesta',
  templateUrl: './nueva-encuesta.component.html',
  styleUrls: ['./nueva-encuesta.component.css']
})
export class NuevaEncuestaComponent implements OnInit {
  encuesta: Encuesta;
  elecciones: Eleccion[] = [];

  constructor(
    private encuestaService: EncuestaService,
    private eleccionService: EleccionService
  ) {
    this.encuesta = new Encuesta();
   }

  ngOnInit() {
    this.elecciones = this.eleccionService.listELeccion;
  }

  onSubmit() {
    console.log(this.encuesta);
    this.encuestaService.guardarEncuesta(this.encuesta).subscribe((data) => {
      this.encuestaService.mensajeRegistro.next('Registro Correctamente...');
    }, (error) => {
      this.encuestaService.mensajeRegistro.next('Error al guardar el encuesta...');
    });
  }

}
