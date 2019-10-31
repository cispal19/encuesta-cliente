import { Injectable } from '@angular/core';
import { HOST_BACKEND, PARAM_USUARIO, ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '../_shared/constants';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginDTO } from '../_model/LoginDTO';
import { BasicAccess } from '../_model/BasicAccess';
import { RenewPasswordFirst } from '../_model/RenewPasswordFirst';
import { ChangePassword } from '../_model/ChangePassword';


@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  urlOauth: string = `${HOST_BACKEND}/api/seguridad/token`;
  urlLogin: string = `${HOST_BACKEND}/api/seguridad/login`;
  urlRenewPassword: string = `${HOST_BACKEND}/api/seguridad/first-reset-password`;
  urlUpdatePassword: string = `${HOST_BACKEND}/api/seguridad/change-password`;
  urlRefreshToken: string = `${HOST_BACKEND}/api/seguridad/refresh-token`;
  urlSignOut: string = `${HOST_BACKEND}/api/seguridad/signout`;

  constructor( private http: HttpClient, private router: Router) { }

  login(loginDTO: LoginDTO){
    return this.http.post(`${this.urlLogin}`, loginDTO);
  }

  renewPasswordFirst(updatePassword: RenewPasswordFirst){
    return this.http.post(`${this.urlRenewPassword}`, updatePassword);
  }

  updatePassword(updatePassword: ChangePassword){
    return this.http.post(`${this.urlUpdatePassword}`, updatePassword);
  }

  validarToken(){
    return this.http.post(this.urlOauth, "");
  }

  refreshToken(){
    let request = new BasicAccess();
    request.token = sessionStorage.getItem(REFRESH_TOKEN_NAME);
    return this.http.post(this.urlRefreshToken, request);
  }


  cerrarSession(){
    let request = new BasicAccess();
    request.token = sessionStorage.getItem(ACCESS_TOKEN_NAME);
    this.http.post(this.urlSignOut, request).subscribe((data:any)=>{
      console.log(data.body);
    }, (error)=>{
      console.log(error);
    });
    sessionStorage.clear();
    console.log('Se borro tokens de storage');
    setTimeout(()=> {
      this.router.navigate(["/"]);
    },500);

  }

  esRoleAdmin(){
    let usuario = JSON.parse(sessionStorage.getItem(PARAM_USUARIO));
    let rpta = false;
    if (usuario !== null && usuario.authorities !== null) {
      usuario.authorities.forEach(element => {
        if (element.authority === 'ROLE_ADMINISTRADOR'){
          rpta = true;
        }
      });
    }
    return rpta;
  }

}
