import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/model/profile';
import { ProfileService } from 'src/app/service/profile-service/profile.service';

@Component({
  selector: 'app-add-biography',
  templateUrl: './add-biography.component.html',
  styleUrls: ['./add-biography.component.css']
})
export class AddBiographyComponent implements OnInit {
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

  addBiography(): void {
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
