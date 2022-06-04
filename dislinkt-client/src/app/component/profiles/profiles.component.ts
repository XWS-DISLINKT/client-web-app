import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/model/profile';
import { ProfileService } from 'src/app/service/profile-service/profile.service';
import { isLoggedIn } from 'src/app/service/authentication-service/auth-service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  public searchText: string = "";
  public profiles: Profile[] = [];
  public results: number = 0;
  isAuthenticated = false;

  constructor(private _profileService: ProfileService) { }

  ngOnInit(): void {
    this.getPublicProfiles();
    this.isAuthenticated = isLoggedIn();
  }

  getPublicProfiles(): void {
    this._profileService.getPublicProfiles().subscribe(
      response => {
        this.profiles = response;
        this.results = response.length;
      }
    )
  }

  searchProfiles(): void {
    if (this.searchText === "") {
      this.getPublicProfiles();
    } else {
      this._profileService.searchProfiles(this.searchText).subscribe(
        response => {
          this.profiles = response.profiles;
        }
      )
    }
  }

  undoSearch(): void {
    this.searchText = "";
    this.getPublicProfiles();
  }

}
