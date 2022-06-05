import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from 'src/app/model/job';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private applicationURL = environment.applicationURL;

  constructor(private _http: HttpClient) { }

  getJobs(): Observable<Job[]> {
    return this._http.get<Job[]>(this.applicationURL + "/post/job");
  }
}
