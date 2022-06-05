import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestDTO } from 'src/app/dto/requestDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private applicationURL = environment.applicationURL;

  constructor(private _http: HttpClient) { }

  getConnections(userId: string): Observable<any> {
    return this._http.get<any>(this.applicationURL + "/connection/usernames/" + userId);
  }

  getRequests(userId: string): Observable<any> {
    return this._http.get<any>(this.applicationURL + "/connection/requests/" + userId);
  }

  approveRequest(approveRequestDTO: RequestDTO): Observable<any> {
    return this._http.put<any>(this.applicationURL + "/connection/approve", approveRequestDTO);
  }

  makeConnectionRequest(request: RequestDTO): Observable<any> {
    return this._http.post<any>(this.applicationURL + "/connection/request", request);
  }

  makeConnection(request: RequestDTO): Observable<any> {
    return this._http.post<any>(this.applicationURL + "/connection", request);
  }

}
