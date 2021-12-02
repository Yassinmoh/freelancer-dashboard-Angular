import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { switchMap, map, flatMap, take } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';





@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  jwtHelper = new JwtHelperService();
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.indexOf('/refreshtoken') > -1) {
      return next.handle(req);
    }
    const accesToken = localStorage.getItem('access_token');
    if (accesToken) {
      const expiration = localStorage.getItem('expiration');

      // Checks for jwt access token expiration

      if (Date.now() < Number(expiration) * 1000) {
        const transformedReq = req.clone({
          headers: req.headers.set('Authorization', `bearer ${accesToken}`),
        });
        return next.handle(transformedReq);
      }
      const payload = {
        accesToken: accesToken,
        refresh_token: localStorage.getItem('refresh_token'),
      };

      // If the jwt access token expires, then calls the refresh token endpoint.
      return this.authService.callRefershToken(payload).pipe(
        switchMap((newTokens: any) => {
          localStorage.setItem('access_token', newTokens.accesToken);
          localStorage.setItem('refresh_token', newTokens.refresh_token);
          const decodedUser = this.jwtHelper.decodeToken(
            newTokens.accesToken
          );
          localStorage.setItem('expiration', decodedUser.exp);
          this.authService.userInfo.next(decodedUser);
          const transformedReq = req.clone({
            headers: req.headers.set(
              'Authorization',
              `bearer ${newTokens.accesToken}`
            ),
          });
          return next.handle(transformedReq);
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
