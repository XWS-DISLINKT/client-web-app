import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Experience } from 'src/app/model/experience';
import { Profile } from 'src/app/model/profile';
import { ProfileService } from 'src/app/service/profile-service/profile.service';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css']
})
export class AddExperienceComponent implements OnInit {
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
    experience: [],
    receivesMessageNotifications: false,
    receivesPostNotifications: false,
    receivesConnectionNotifications: false,
    isAdmin: false
  }

  experience: Experience = {
    id: "",
    jobTitle: "",
    companyName: "",
    description: ""
  }

  constructor(private _profileService: ProfileService) {

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

  addExperience(): void {
    this.profile.experience.push(this.experience);
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
