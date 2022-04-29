import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  public canComment: boolean = false;
  public isProfileOwner: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  showComentInput(): void {
    this.canComment = !this.canComment;
  }

}
