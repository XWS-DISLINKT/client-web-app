import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewJobDto } from 'src/app/model/new-job-dto';
import { JobService } from 'src/app/service/job-service/job.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {
  public form: FormGroup;
  public positionCtrl: FormControl;
  public companyCtrl: FormControl;
  public locationCtrl: FormControl;
  public descriptionCtrl: FormControl;

  constructor(private jobService: JobService,  public dialogRef: MatDialogRef<AddJobComponent>) {
    this.positionCtrl = new FormControl("", [Validators.required]);
    this.companyCtrl = new FormControl("", [Validators.required]);
    this.locationCtrl = new FormControl("", [Validators.required]);
    this.descriptionCtrl = new FormControl("", []);

    this.form = new FormGroup({
      'positionCtrl': this.positionCtrl,
      'companyCtrl': this.companyCtrl,
      'locationCtrl': this.locationCtrl,
      'descriptionCtrl': this.descriptionCtrl,
    })
  }

  ngOnInit(): void {
  }

  onSave() {
    if (this.form.valid) {
      let dto: NewJobDto = {description: this.descriptionCtrl.value, location: this.locationCtrl.value, position: this.positionCtrl.value, companyName: this.companyCtrl.value}
      this.jobService.createJob(dto).subscribe((response) => {
        console.log("added to dislinkt app")
        this.dialogRef.close()
      })

    }
  }

}
