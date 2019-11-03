import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../_services/security.service';
import { RespuestaApi } from '../../_model/RespuestaApi';
import { TOKEN_NAME, ACCESS_TOKEN_NAME, PARAM_USUARIO } from '../../_shared/constants';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  opened: boolean = false;
  isAdmin: boolean = false;
  usuario: any = {};

  constructor(
    private securityService: SecurityService
    ) { 
      this.getUsuario();
    }

  ngOnInit() {
    setTimeout(() => {
      this.isAdmin = this.securityService.esRoleAdmin();
    }, 1500);

    setInterval(() => {
      this.securityService.refreshToken().subscribe((data: RespuestaApi) => {
        if (data.status === 'OK'){
          sessionStorage.setItem(TOKEN_NAME, data.idToken);
          sessionStorage.setItem(ACCESS_TOKEN_NAME, data.accessToken);
        }
      });
    }, 1000 * 60 * 30);
  }
  getUsuario(){
   let  usuarioSe = JSON.parse(sessionStorage.getItem(PARAM_USUARIO));
   this.usuario = usuarioSe;
   console.log(this.usuario);
  }

}
