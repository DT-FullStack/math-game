// import { AbstractControlOptions, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { MathValidators } from '../math-validators';
import { delay, filter, tap } from "rxjs/operators";

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent implements OnInit {
  secondsPerSolution: number = 0;
  mathForm = this.formBuilder.group({
    a: [this.randomNumber()],
    b: [this.randomNumber()],
    answer: [''],
  }, { validators: [MathValidators.addition('answer', 'a', 'b')] });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  get a() { return this.mathForm.value.a }
  get b() { return this.mathForm.value.b }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }

  refreshForm() {
    this.mathForm.setValue({ a: this.randomNumber(), b: this.randomNumber(), answer: '' })
  }

  ngOnInit(): void {
    const startTime = new Date();
    let numberSolved = 0;
    this.mathForm.statusChanges.pipe(
      filter(value => value === 'VALID'),
      tap(() => {
        numberSolved++;
        this.secondsPerSolution = (new Date().getTime() - startTime.getTime()) / numberSolved / 1000;
      }),
      delay(300)
    ).subscribe(() => this.refreshForm())
  }

}
