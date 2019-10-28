import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { SecurityService } from './security.service';
import { Observable } from 'rxjs';
import { TOKEN_NAME } from '../_shared/constants';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private serviceSecurity: SecurityService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = sessionStorage.getItem(TOKEN_NAME);
    request = request.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(request).pipe(
      tap( event => {
        if (event instanceof HttpResponse){

        }
      }, err => {
        console.log("err: "+ JSON.stringify(err));
        if (err.status === 401 || err.status === 403){
          alert("Ocurrio un error al validad su token ... intente loguearse nuevamente");
          this.serviceSecurity.cerrarSession();
        }
      })
    );
  }

 
}
