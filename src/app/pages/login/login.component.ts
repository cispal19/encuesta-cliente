import { Component, OnInit } from '@angular/core';
import { LoginDTO } from '../../_model/LoginDTO';
import { Router } from '@angular/router';
import { SecurityService } from '../../_services/security.service';
import { MatDialog } from '@angular/material';
import { RespuestaApi } from '../../_model/RespuestaApi';
import { TOKEN_NAME, REFRESH_TOKEN_NAME, ACCESS_TOKEN_NAME, PARAM_USUARIO } from '../../_shared/constants';
import { ErrorComponent } from './error/error.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: LoginDTO;

  constructor(
    private router: Router,
    private securityService: SecurityService,
    private dialog: MatDialog) {
      this.login = new LoginDTO();
     }

  ngOnInit() {
  }

  ingresar(){
    this.securityService.login(this.login).subscribe((data: RespuestaApi) => {
      if(data.status == 'OK'){
        sessionStorage.setItem(TOKEN_NAME,data.idToken);
        sessionStorage.setItem(REFRESH_TOKEN_NAME, data.refreshToken);
        sessionStorage.setItem(ACCESS_TOKEN_NAME, data.accessToken);

        this.securityService.validarToken().subscribe((dato: any) => {
          sessionStorage.setItem(PARAM_USUARIO, JSON.stringify(dato.body));
          this.router.navigate(["main"]);
        });
      }else{
        this.dialog.open(ErrorComponent, {
          width: '60%',
          height: '60%',
          data: { 
            error: data.body,
            dato: data,
            usuario: this.login.username 
          }
        });
        
      }
    }, (error) => {
      this.dialog.open(ErrorComponent, {
        width: '60%',
        height: '60%',
        data: { error: error }
      });
    });
  }

}
