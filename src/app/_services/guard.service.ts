import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { SecurityService } from './security.service';
import { TOKEN_NAME } from '../_shared/constants';


@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {


  constructor(
    private router: Router,
    private securityService: SecurityService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      console.log(state.url);
      let token = sessionStorage.getItem(TOKEN_NAME);
      let isAdministrador = this.securityService.esRoleAdmin();
      if (token != null) {
        if (!isAdministrador){
          console.log(isAdministrador);
          switch (state.url){
            case '/main/encuesta':
              this.router.navigate(['main']);
              return false;
          }
        }
        return true;
      } else {
        if (state.url !== '/login'){
          this.router.navigate(['login']);
        } else {
          return true;
        }
      }
      return false;
    }
}
