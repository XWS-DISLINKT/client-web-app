import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RequestDTO } from 'src/app/dto/requestDTO';
import { AddBiographyComponent } from 'src/app/modal/add-biography/add-biography.component';
import { AddEducationComponent } from 'src/app/modal/add-education/add-education.component';
import { AddExperienceComponent } from 'src/app/modal/add-experience/add-experience.component';
import { AddInterestComponent } from 'src/app/modal/add-interest/add-interest.component';
import { AddSkillComponent } from 'src/app/modal/add-skill/add-skill.component';
import { DisplayConnectionTokenComponent } from 'src/app/modal/display-connection-token/display-connection-token.component';
import { EditEducationComponent } from 'src/app/modal/edit-education/edit-education.component';
import { EditExperienceComponent } from 'src/app/modal/edit-experience/edit-experience.component';
import { Education } from 'src/app/model/education';
import { Experience } from 'src/app/model/experience';
import { Post } from 'src/app/model/post';
import { Profile } from 'src/app/model/profile';
import { ConnectionService } from 'src/app/service/connection-service/connection.service';
import { PostService } from 'src/app/service/post-service/post.service';
import { ProfileService } from 'src/app/service/profile-service/profile.service';
import { isLoggedIn } from 'src/app/service/authentication-service/auth-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private id: any;
  private ownerId: any;
  private routes: any;
  private connectionsId: string[];
  isProfileOwner = false;
  isAuthenticated = false; 
  isConnection = false;
  profile: Profile = {
    id: "",
    name: "",
    lastName: "",
    email: "",
    username: "",
    biography: "",
    isPrivate: false,
    education: [],
    skills: [],
    interests: [],
    experience: [],
    receivesMessageNotifications: false,
    receivesPostNotifications: false,
    receivesConnectionNotifications: false,
    isAdmin: false
  }

  private requestDTO: RequestDTO = {
    requestSenderId: "",
    requestReceiverId: ""
  }

  public headline: string = "";

  posts: Post[] = [];

  constructor(public matDialog: MatDialog,
              private _route: ActivatedRoute,
              private _profileService: ProfileService,
              private _postService: PostService,
              private _connectionService: ConnectionService) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.url[1].path;
    this.isProfileOwner = this.checkIfIsOwner(this.id);
    this.ownerId = localStorage.getItem("loggedId");
    this.getProfile(this.id);
    this.getUserPosts(this.id);
    this.isAuthenticated = isLoggedIn();  
    this.getConnections(this.ownerId);  
  }

  getProfile(id: string): void {
    this._profileService.getProfile(id).subscribe(
      response => {
        this.profile = response;
        this.headline = response.experience[0].jobTitle + " at " + response.experience[0].companyName;
      }
    )
  }

  checkIfIsOwner(id: string): boolean {
    return id === localStorage.getItem("loggedId") ? true : false;
  }

  checkIfIsConnection(id: string): void {
    if (!this.isProfileOwner) {
      for (let i = 0; i < this.connectionsId.length; i++) {
        if (id === this.connectionsId[i]) {
          this.isConnection = true;
        }
      }
    } else {
      this.isConnection = false;
    }
  }

  getUserPosts(userId: string): void {
    this._postService.getPostsByUser(userId).subscribe(
      response => {
        this.posts = response.posts;
        this.getCommentsForPosts(this.posts)
      }
    )
  }

  getCommentsForPosts(posts: Post[]): void {
    for (let i = 0; i < posts.length; i++) {
      this._postService.getAllCommentsByPost(posts[i].id).subscribe(
        response => {
          posts[i].comments = response.comments;
          posts[i].numberOfComments = response.comments.length;
          this._postService.getAllReactionsByPost(posts[i].id).subscribe(
            res => {
              posts[i].reactions = res.reactions;
              posts[i].numberOfReactions = res.reactions.length;
            }
          )
        }
      )
    }
  }

  blockConnection(): void {
    this.requestDTO.requestReceiverId = this.id;
    this.requestDTO.requestSenderId = this.ownerId;

    this._connectionService.blockConnection(this.requestDTO).subscribe(
      response => { console.log(response); }
    )
  }

  makeProfilePublic(): void {
    this.profile.isPrivate = false;
    console.log(this.profile)
    this._profileService.updateProfile(this.id, this.profile).subscribe(
      response => {
        console.log(response);
      }
    )
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  makeProfilePrivate(): void {
    this.profile.isPrivate = true;
    console.log(this.profile)
    this._profileService.updateProfile(this.id, this.profile).subscribe(
      response => {
        console.log(response);
      }
    )
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  getConnections(userId: string): void {
    this._connectionService.getConnections(userId).subscribe(
      response => {
        this.connectionsId = response;
        this.checkIfIsConnection(this.id);
        console.log(this.isConnection);
      }
    )
  }

  openModalUpdateExperince(experience: Experience): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "add-experience-modal";
    dialogConfig.height = "70%";
    dialogConfig.width = "32%";
    dialogConfig.data = experience;
    const modalDialog = this.matDialog.open(EditExperienceComponent, dialogConfig);
  }

  openModalUpdateEducation(education: Education): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "add-experience-modal";
    dialogConfig.height = "70%";
    dialogConfig.width = "32%";
    dialogConfig.data = education;
    const modalDialog = this.matDialog.open(EditEducationComponent, dialogConfig);
  }

  openModalAddBiography(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "add-experience-modal";
    dialogConfig.height = "70%";
    dialogConfig.width = "32%";
    const modalDialog = this.matDialog.open(AddBiographyComponent, dialogConfig);
  }

  openModalAddExperience(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "add-experience-modal";
    dialogConfig.height = "70%";
    dialogConfig.width = "32%";
    const modalDialog = this.matDialog.open(AddExperienceComponent, dialogConfig);
  }

  openModalAddEducation(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "add-education-modal";
    dialogConfig.height = "70%";
    dialogConfig.width = "32%";
    const modalDialog = this.matDialog.open(AddEducationComponent, dialogConfig);
  }

  openModalAddSkills(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "add-skills-modal";
    dialogConfig.height = "35%";
    dialogConfig.width = "32%";
    const modalDialog = this.matDialog.open(AddSkillComponent, dialogConfig);
  }

  openModalAddInterests(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "add-interests-modal";
    dialogConfig.height = "35%";
    dialogConfig.width = "32%";
    const modalDialog = this.matDialog.open(AddInterestComponent, dialogConfig);
  }

  openConnectionDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "add-interests-modal";
    dialogConfig.height = "32%";
    dialogConfig.width = "22%";
    //dialogConfig.data = { userId: this.id }
    const modalDialog = this.matDialog.open(DisplayConnectionTokenComponent, dialogConfig);
  }

}
