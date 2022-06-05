import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiKeyDto } from 'src/app/model/api-key-dto';
import { JobService } from 'src/app/service/job-service/job.service';

export interface DialogData {
  //companyId: number;
  //companyName: string;
  //token: string;
}

@Component({
  selector: 'app-display-connection-token',
  templateUrl: './display-connection-token.component.html',
  styleUrls: ['./display-connection-token.component.css']
})
export class DisplayConnectionTokenComponent implements OnInit {
  apikey: ApiKeyDto = {apiKey: "", userId: ""};
  token: string = ""

  constructor(private jobService: JobService, @Inject(MAT_DIALOG_DATA) public data: DialogData,  public dialogRef: MatDialogRef<DisplayConnectionTokenComponent>) { }

  ngOnInit(): void {
    this.jobService.getConnectionToken().subscribe((response) => {
      console.log(response)
      this.apikey = response;
      this.token = this.apikey.apiKey;
    })
  }

}
