import { Injectable } from '@angular/core';
import { HOST_BACKEND } from '../_shared/constants';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginDTO } from '../_model/LoginDTO';


@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  urlOauth: string = `${HOST_BACKEND}/api/seguridad/token`;
  urlLogin: string = `${HOST_BACKEND}/api/seguridad/login`;
  urlRenewPassword: string = `${HOST_BACKEND}/api/seguridad/first-reset-password`;
  urlUpdatePassword: string = `${HOST_BACKEND}/api/seguridad/change-password`;
  urlRefreshToken: string = `${HOST_BACKEND}/api/seguridad/refresh-token`;
  urlSingOut: string = `${HOST_BACKEND}/api/seguridad/signout`;

  constructor( private http: HttpClient, private router: Router) { }

  login(loginDTO: LoginDTO){
    return this.http.post(`${this.urlLogin}`, loginDTO);
  }

  validarToken(){
    return this.http.post(this.urlOauth, "");
  }

  cerrarSession(){

  }

  esRoleAdmin(){
    let rpta = false;
    return rpta;
  }

}
