import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-add-interest',
  templateUrl: './add-interest.component.html',
  styleUrls: ['./add-interest.component.css']
})

export class AddInterestComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  interestCtrl = new FormControl();
  filteredInterests: Observable<string[]>;
  interests: string[] = ['Web Programming', 'Artificial Intelligence'];
  allInterests: string[] = ['Domain Driven Design', 'Object Oriented Programming', 'Clean Code'];

  @ViewChild('interestInput') interestInput: ElementRef<HTMLInputElement> = {} as ElementRef;

  constructor() {
    this.filteredInterests = this.interestCtrl.valueChanges.pipe(
      startWith(null),
      map((interest: string | null) => (interest ? this._filter(interest) : this.allInterests.slice())),
    );
  }

  ngOnInit(): void {
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.interests.push(value);
    }

    event.chipInput!.clear();
    this.interestCtrl.setValue(null);
  }

  remove(skill: string): void {
    const index = this.interests.indexOf(skill);

    if (index >= 0) {
      this.interests.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.interests.push(event.option.viewValue);
    this.interestInput.nativeElement.value = '';
    this.interestCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allInterests.filter(interest => interest.toLowerCase().includes(filterValue));
  }

}
