import { Component, OnInit } from '@angular/core';
import { Encuesta } from '../../../_model/Encuesta';
import { Eleccion } from '../../../_model/Eleccion';
import { EncuestaService } from '../../../_services/encuesta.service';
import { EleccionService } from '../../../_services/eleccion.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  encuesta: Encuesta;
  elecciones: Eleccion[] = [];
  isSave: boolean = false;

  constructor(
    private encuestaService: EncuestaService,
    private eleccionService: EleccionService,
    private _snackBar: MatSnackBar
  ) {
    this.encuesta = new Encuesta();
   }

  ngOnInit() {
    this.elecciones = this.eleccionService.listELeccion;
    console.log(this.elecciones);
  }

  onSubmit() {
    this.encuestaService.guardarEncuesta(this.encuesta).subscribe((data) => {
      this.isSave = true;
     let snack = this._snackBar.open("se guardo correctamente","Aceptar",{
        duration: 10000,
      });
      snack.onAction().subscribe(() => {
        this.encuesta = new Encuesta();
        this.isSave = false;
      });
     }, (error) => {
      this.encuestaService.mensajeRegistro.next('Error al guardar el encuesta...');
    });
   
  }

  
}
