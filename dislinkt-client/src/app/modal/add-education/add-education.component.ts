import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/model/profile';
import { ProfileService } from 'src/app/service/profile-service/profile.service';
import { Education } from 'src/app/model/education';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.css']
})
export class AddEducationComponent implements OnInit {
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
  
  constructor(private _profileService: ProfileService) { }

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

  addEducation(): void {
    this.profile.education.push(this.education);
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
