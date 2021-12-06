import { FormArray } from '@angular/forms';
import { AbstractControl, FormControl, FormGroup, NgControl } from '@angular/forms';
import { Directive, ElementRef } from '@angular/core';
import { map } from 'rxjs/operators';


@Directive({
  selector: '[appAnswerHighlight]'
})
export class AnswerHighlightDirective {
  private control: AbstractControl;
  private parent?: FormGroup | FormArray;

  constructor(
    private ele: ElementRef,
    private controlName: NgControl
  ) {
  }

  ngOnInit() {
    this.control = this.controlName.control;
    this.parent = this.control.parent;
    console.log(this);
    this.parent.valueChanges.pipe(
      map(value => {
        const { a, b, answer } = value;
        return Math.abs((a + b - answer) / (a + b))
      })
    ).subscribe(value => {
      value < 0.2
        ? this.ele.nativeElement.classList.add('close')
        : this.ele.nativeElement.classList.remove('close')
    })
  }
}
