import { Component } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { EleccionService } from './_services/eleccion.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'encuesta-cliente';


  constructor(public eleccionService: EleccionService) {}

}
