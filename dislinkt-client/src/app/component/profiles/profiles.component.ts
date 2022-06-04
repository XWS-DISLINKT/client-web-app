import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/model/profile';
import { ProfileService } from 'src/app/service/profile-service/profile.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  public searchText: string = "";
  public profiles: Profile[] = [];
  public results: number = 0;

  constructor(private _profileService: ProfileService) { }

  ngOnInit(): void {
    this.getPublicProfiles();

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
