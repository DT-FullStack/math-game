// import { AbstractControlOptions, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { MathValidators, Operators, OperatorText } from '../math-validators';
import { delay, filter, tap } from "rxjs/operators";

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent implements OnInit {
  secondsPerSolution: number = 0;
  numberSolved: number = 0;
  startTime: Date = new Date();
  elapsedTime: number = 0;
  timer = setInterval(() => {
    this.secondsPerSolution = (new Date().getTime() - this.startTime.getTime()) / this.numberSolved / 1000;
    this.elapsedTime++;
  }, 1000)

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
  get operatorText(): string {
    return OperatorText[this.operator];
  }


  operator: Operators = 0;

  nextOperator(): Operators {
    return Math.floor(Math.random() * 3);
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }

  refreshForm() {
    this.mathForm.setValue({ a: this.randomNumber(), b: this.randomNumber(), answer: '' })
    this.operator = this.nextOperator();
    const validator = MathValidators[Operators[this.operator]]('answer', 'a', 'b');
    this.mathForm.setValidators(validator);
  }

  resetGame() {
    clearInterval(this.timer);
    this.numberSolved = 0;
    this.startTime = new Date();
    this.elapsedTime = 0;
    this.refreshForm();
    this.timer = setInterval(() => {
      this.secondsPerSolution = (new Date().getTime() - this.startTime.getTime()) / this.numberSolved / 1000;
      this.elapsedTime++;
    }, 1000)
  }

  ngOnInit(): void {
    this.mathForm.statusChanges.pipe(
      filter(value => value === 'VALID'),
      tap(() => {
        this.numberSolved++;
      }),
      delay(300)
    ).subscribe(() => this.refreshForm())


  }

}
