import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PostDTO } from 'src/app/dto/postDTO';
import { ReactionDTO } from 'src/app/dto/reactionDTO';
import { CommentDTO } from 'src/app/dto/commentDTO';
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
  @Output() public onUploadFinished = new EventEmitter();
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

  private reactionDTO: ReactionDTO = {
    id: "",
    postId: "",
    userId: "",
    reaction: ""
  }

  public commentDTO: CommentDTO = {
    id: "",
    postId: "",
    userId: "",
    text: ""
  }

  constructor(private _postService: PostService,
              private _profileService: ProfileService) { }

  ngOnInit(): void {
    this.id = localStorage.getItem("loggedId");
    this.getFeed(this.id);
    
  }

  createPost(files): void {
    this.newPost.userId = this.id;
    this.newPost.links.push("https://github.com/XWS-DISLINKT/dislinkt");
    //this.dto.post.text = this.post;
    this.uploadFile(files);
    console.log(this.newPost)
    this._postService.createPost(this.newPost).subscribe(
      response => {
        console.log(response);
      }
    )
  }

  leaveComment(postId: string): void {
    this.commentDTO.id = "623b0cc3a34d25d8567f9f90";
    this.commentDTO.userId = this.id;
    this.commentDTO.postId = postId;
    console.log(this.commentDTO)
    this._postService.leaveComment(this.commentDTO).subscribe(
      response => {
        console.log(response);
      }
    )
  }

  like(postId: string): void {
    console.log(postId);
    this.reactionDTO.id = "623b0cc3a34d25d8567f9f90";
    this.reactionDTO.postId = postId;
    this.reactionDTO.userId = this.id;
    this.reactionDTO.reaction = "like";
    console.log(this.reactionDTO);
    this._postService.likePost(this.reactionDTO).subscribe(
      response => {
        console.log(response);
      }
    )
  }

  dislike(postId: string): void {
    this.reactionDTO.id = "623b0cc3a34d25d8567f9f90";
    this.reactionDTO.postId = postId;
    this.reactionDTO.userId = this.id;
    this.reactionDTO.reaction = "dislike";
    this._postService.dislikePost(this.reactionDTO).subscribe(
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

  uploadFile = (files) => {
    if(files.length === 0){
      return;
    }

    let imageToUpload = <File>files[0];
    this.newPost.picture = imageToUpload.name;
    const formData = new FormData();
    formData.append('file', imageToUpload, imageToUpload.name);
    formData.append('fileName', imageToUpload.name);
    this._postService.uploadImage(formData).subscribe(event =>{
      if(event.type === HttpEventType.Response){
        this.onUploadFinished.emit(event.body);
      }
    })
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
