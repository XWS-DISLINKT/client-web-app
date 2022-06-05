import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentDTO } from 'src/app/dto/commentDTO';
import { PostDTO } from 'src/app/dto/postDTO';
import { ReactionDTO } from 'src/app/dto/reactionDTO';
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

  createPost(newPost: PostDTO): Observable<any> {
    return this._http.post<any>(this.applicationURL + "/post", newPost);
  }

  uploadImage(formData: FormData): Observable<any> {
    return this._http.post<any>(this.applicationURL + "/post/image", formData, {reportProgress: false, observe: 'events'});
  }

  likePost(reactionDTO: ReactionDTO): Observable<any> {
    return this._http.post<any>(this.applicationURL + "/post/like", reactionDTO);
  }

  dislikePost(reactionDTO: ReactionDTO): Observable<any> {
    return this._http.post<any>(this.applicationURL + "/post/dislike", reactionDTO);
  }

  leaveComment(commentDTO: CommentDTO): Observable<any> {
    return this._http.post<any>(this.applicationURL + "/post/comment", commentDTO);
  }
}
