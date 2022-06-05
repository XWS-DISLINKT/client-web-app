import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnotherPostDTO } from 'src/app/dto/anotherPostDTO';
import { PostDTO } from 'src/app/dto/postDTO';
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

  getFeed(userId: string): Observable<any> {
    return this._http.get<any>(this.applicationURL + "/post/feed/" + userId);
  }

  createPost(post: AnotherPostDTO): Observable<any> {
    return this._http.post<any>(this.applicationURL + "/post", post);
  }
}
