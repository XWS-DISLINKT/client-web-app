import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  public canComment: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  showComentInput(): void {
    this.canComment = !this.canComment;
  }

}
