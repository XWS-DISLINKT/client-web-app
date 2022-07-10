import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/model/job';
import { JobService } from 'src/app/service/job-service/job.service';

@Component({
  selector: 'app-job-recommendations',
  templateUrl: './job-recommendations.component.html',
  styleUrls: ['./job-recommendations.component.css']
})
export class JobRecommendationsComponent implements OnInit {
  jobs: Job[] = [];
  allJobs: Job[] = [];
  public searchText: string = "";

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    /*this.jobService.getJobs().subscribe(
      response => {
        this.jobs = response;
        this.allJobs = response;
      }
    )*/
  }

}
