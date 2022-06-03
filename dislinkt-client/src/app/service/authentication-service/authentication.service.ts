import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDTO } from 'src/app/dto/loginDTO';
import { User } from 'src/app/model/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private applicationURL = environment.applicationURL;

  constructor(private _http: HttpClient) { }

  signup(user: User): Observable<any> {
    return this._http.post<any>(this.applicationURL + "/profile", user);
  }

  login(loginDTO: LoginDTO): Observable<any> {
    return this._http.post<any>(this.applicationURL + "/login", loginDTO);
  }
}
