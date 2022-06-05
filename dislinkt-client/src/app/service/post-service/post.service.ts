import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private applicationURL = environment.applicationURL;

  constructor(private _http: HttpClient) { }

  getPostsByUser(userId: string): Observable<any> {
    return this._http.get<any>(this.applicationURL + "/post/user/" + userId);
  }

  getAllCommentsByPost(postId: string): Observable<any> {
    return this._http.get<any>(this.applicationURL + "/post/" + postId + "/comment");
  }

  getAllReactionsByPost(postId: string): Observable<any> {
    return this._http.get<any>(this.applicationURL + "/post/" + postId + "/reaction");
  }
}