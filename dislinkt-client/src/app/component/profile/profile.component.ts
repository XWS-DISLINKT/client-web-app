import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEducationComponent } from 'src/app/modal/add-education/add-education.component';
import { AddExperienceComponent } from 'src/app/modal/add-experience/add-experience.component';
import { AddInterestComponent } from 'src/app/modal/add-interest/add-interest.component';
import { AddSkillComponent } from 'src/app/modal/add-skill/add-skill.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isProfileOwner = true;

  constructor(public matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  openModalAddExperience(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "add-experience-modal";
    dialogConfig.height = "70%";
    dialogConfig.width = "32%";
    const modalDialog = this.matDialog.open(AddExperienceComponent, dialogConfig);
  }

  openModalAddEducation(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "add-education-modal";
    dialogConfig.height = "70%";
    dialogConfig.width = "32%";
    const modalDialog = this.matDialog.open(AddEducationComponent, dialogConfig);
  }

  openModalAddSkills(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "add-skills-modal";
    dialogConfig.height = "50%";
    dialogConfig.width = "32%";
    const modalDialog = this.matDialog.open(AddSkillComponent, dialogConfig);
  }

  openModalAddInterests(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "add-interests-modal";
    dialogConfig.height = "50%";
    dialogConfig.width = "32%";
    const modalDialog = this.matDialog.open(AddInterestComponent, dialogConfig);
  }

}
