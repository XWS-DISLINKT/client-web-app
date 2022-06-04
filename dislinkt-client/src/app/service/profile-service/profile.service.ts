import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private applicationURL = environment.applicationURL;
  
  constructor(private _http: HttpClient) { }

  getPublicProfiles(): Observable<any> {
    return this._http.get<any>(this.applicationURL + "/profile");
  }

  searchProfiles(param: string): Observable<any> {
    return this._http.get<any>(this.applicationURL + "/profile/search/" + param);
  }

  getProfile(id: string): Observable<any> {
    return this._http.get<any>(this.applicationURL + "/profile/" + id);
  }
}
