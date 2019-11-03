import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { Encuesta } from '../../_model/Encuesta';
import { EncuestaService } from '../../_services/encuesta.service';
import { NuevaEncuestaComponent } from './nueva-encuesta/nueva-encuesta.component';




@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  dataSource: MatTableDataSource<Encuesta>;
  totalRegistro: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['idEncuesta', 'nombres', 'apellidos', 'eleccion', 'acciones'];
  
  constructor(
    private dialog: MatDialog,
    private serviceEncuesta: EncuestaService,
    private snackBar: MatSnackBar
  ) { 
    this.dataSource = new MatTableDataSource<Encuesta>();
  }

  ngOnInit() {
    this.getLista();
    this.serviceEncuesta.mensajeRegistro.subscribe((dato) => {
      this.dialog.closeAll();
      this.snackBar.open(dato, null, {
        duration: 1500,
      });
      this.getLista();
    });
  }

  getLista() {
    this.serviceEncuesta.getEncuesta().subscribe((datos) => {
      this.dataSource = new MatTableDataSource<Encuesta>(datos);
    });
  }
  openDialog() {
    this.dialog.open(NuevaEncuestaComponent, {
      width: '31%',
      height: '50%'
    });
  }
  eliminarEncuesta(id: number) {
    this.serviceEncuesta.eliminarEncuesta(id).subscribe((data) => {
      this.serviceEncuesta.mensajeRegistro.next('Encuesta ' + id + ' eliminado correctamente...');
    });
  }


}
