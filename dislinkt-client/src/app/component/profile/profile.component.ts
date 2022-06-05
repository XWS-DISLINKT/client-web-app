import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AddBiographyComponent } from 'src/app/modal/add-biography/add-biography.component';
import { AddEducationComponent } from 'src/app/modal/add-education/add-education.component';
import { AddExperienceComponent } from 'src/app/modal/add-experience/add-experience.component';
import { AddInterestComponent } from 'src/app/modal/add-interest/add-interest.component';
import { AddSkillComponent } from 'src/app/modal/add-skill/add-skill.component';
import { EditEducationComponent } from 'src/app/modal/edit-education/edit-education.component';
import { EditExperienceComponent } from 'src/app/modal/edit-experience/edit-experience.component';
import { Education } from 'src/app/model/education';
import { Experience } from 'src/app/model/experience';
import { Post } from 'src/app/model/post';
import { Profile } from 'src/app/model/profile';
import { PostService } from 'src/app/service/post-service/post.service';
import { ProfileService } from 'src/app/service/profile-service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private id: any;
  private routes: any;
  isProfileOwner = false; 
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
    experience: []
  }

  public headline: string = "";

  posts: Post[] = [];

  constructor(public matDialog: MatDialog,
              private _route: ActivatedRoute,
              private _profileService: ProfileService,
              private _postService: PostService) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.url[1].path;
    this. isProfileOwner = this.checkIfIsOwner(this.id);
    this.getProfile(this.id);
    this.getUserPosts(this.id);      
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

}
