import { Component, OnInit } from '@angular/core';
import { AnotherPostDTO } from 'src/app/dto/anotherPostDTO';
import { PostDTO } from 'src/app/dto/postDTO';
import { Post } from 'src/app/model/post';
import { Reaction } from 'src/app/model/reaction';
import { PostService } from 'src/app/service/post-service/post.service';
import { ProfileService } from 'src/app/service/profile-service/profile.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  public canComment: boolean = false;
  public isProfileOwner: boolean = true;

  public posts: Post[] = [];
  private id: any;

  public newPost: PostDTO = {
    id: "",
    userId: "",
    text: "",
    picture: "",
    links: []
  }

  constructor(private _postService: PostService,
              private _profileService: ProfileService) { }

  ngOnInit(): void {
    this.id = localStorage.getItem("loggedId");
    this.getFeed(this.id);
    
  }

  createPost(): void {
    this.newPost.userId = this.id;
    this.newPost.links.push("https://github.com/XWS-DISLINKT/dislinkt");
    //this.dto.post.text = this.post;
    console.log(this.newPost)
    this._postService.createPost(this.newPost).subscribe(
      response => {
        console.log(response);
      }
    )
  }

  showComentInput(): void {
    this.canComment = !this.canComment;
  }

  getFeed(id: string): void {
    this._postService.getFeed(id).subscribe(
      response => {
        this.posts = response.posts;
        this.setUserToPost(this.posts);
        this.getCommentsForPosts(this.posts)
      }
    )
  }

  setUserToPost(posts: Post[]): void {
    for(let i = 0; i < posts.length; i++) {
      this._profileService.getProfile(posts[i].userId).subscribe(
        response => {
          posts[i].profile = response;
        }
      )
    }
  }

  getCommentsForPosts(posts: Post[]): void {
    for (let i = 0; i < posts.length; i++) {
      this._postService.getAllCommentsByPost(posts[i].id).subscribe(
        response => {
          posts[i].comments = response.comments;
          posts[i].numberOfComments = response.comments.length;
          this._postService.getAllReactionsByPost(posts[i].id).subscribe(
            res => {
              posts[i].reactions = res.reactions;//[{id:"", postId:"",  reaction: "like", userId:""}, {id:"", postId:"",  reaction: "like", userId:""}, {id:"", postId:"",  reaction: "dislike", userId:""}, {id:"", postId:"",  reaction: "like", userId:""}]
              posts[i].numberOfReactions = res.reactions.length;
            }
          )
        }
      )
    }
  }

  getLikes(reactions: Reaction[]): number{
    var result = reactions.filter(r => r.reaction === "like");
    return result.length;
  }

  getDislikes(reactions: Reaction[]): number{
    var result = reactions.filter(r => r.reaction === "dislike");
    return result.length;
  }

}
