import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-notification-settings',
  templateUrl: './notification-settings.component.html',
  styleUrls: ['./notification-settings.component.css']
})
export class NotificationSettingsComponent implements OnInit {
  isChecked = true;
  formGroup = this._formBuilder.group({
    message: '',
    post: '',
    connection: '',
  });
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onFormSubmit() {
    alert(JSON.stringify(this.formGroup.value, null, 2));
  }
}
