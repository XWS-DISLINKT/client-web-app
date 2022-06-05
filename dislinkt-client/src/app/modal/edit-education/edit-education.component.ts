import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Education } from 'src/app/model/education';
import { Profile } from 'src/app/model/profile';
import { ProfileService } from 'src/app/service/profile-service/profile.service';
import { EditExperienceComponent } from '../edit-experience/edit-experience.component';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.css']
})
export class EditEducationComponent implements OnInit {

  private id: any;

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

  education: Education = {
    id: "",
    school: "",
    fieldOfStudy: "",
    degree: ""
  }

  constructor(private _profileService: ProfileService,
              private _dialogRef: MatDialogRef<EditExperienceComponent>,
              @Inject(MAT_DIALOG_DATA) data) { 

                this.education = data;
              }

  ngOnInit(): void {
    this.id = localStorage.getItem("loggedId");
    this.getProfile(this.id);
  }

  getProfile(id: string): void {
    this._profileService.getProfile(id).subscribe(
      response => {
        this.profile = response;
      }
    )
  }

  updateEducation(): void {
    for (let i = 0; i < this.profile.education.length; i++) {
      if (this.profile.education[i].id === this.education.id) {
        this.profile.education[i] = this.education;
      }
    }

    this._profileService.updateProfile(this.id, this.profile).subscribe(
      response => {
        console.log(this.profile);

      }
    )

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

}
