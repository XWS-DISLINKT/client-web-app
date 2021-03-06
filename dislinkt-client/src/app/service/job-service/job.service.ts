import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiKeyDto } from 'src/app/model/api-key-dto';
import { Job } from 'src/app/model/job';
import { NewJobDto } from 'src/app/model/new-job-dto';
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

  createJob(dto: NewJobDto) {
    return this._http.post(this.applicationURL + "/post/job/dislinkt", dto);
  }

  getConnectionToken(): Observable<ApiKeyDto>{
    return this._http.post<ApiKeyDto>(this.applicationURL + "/post/job/apikey", null);
  }

  getJobSuggestions(id: string): Observable<any> {
    return this._http.get<any>(this.applicationURL + "/post/job/suggest/" + id);
  }

}
