import { AbstractControl, ValidationErrors } from "@angular/forms";

export enum Operators {
  addition, subtraction, multiplication
}
export enum OperatorText {
  '+', '-', 'x'
}

export class MathValidators {
  static addition(target: string, sourceOne: string, sourceTwo: string) {
    return (form: AbstractControl): ValidationErrors | null => {
      const targetValue = form.value[target];
      const firstValue = form.value[sourceOne];
      const secondValue = form.value[sourceTwo];
      if (firstValue + secondValue === parseInt(targetValue)) return null;
      return { addition: true }
    }
  }
  static subtraction(target: string, sourceOne: string, sourceTwo: string) {
    return (form: AbstractControl): ValidationErrors | null => {
      const targetValue = form.value[target];
      const firstValue = form.value[sourceOne];
      const secondValue = form.value[sourceTwo];
      if (firstValue - secondValue === parseInt(targetValue)) return null;
      return { subtraction: true }
    }
  }
  static multiplication(target: string, sourceOne: string, sourceTwo: string) {
    return (form: AbstractControl): ValidationErrors | null => {
      const targetValue = form.value[target];
      const firstValue = form.value[sourceOne];
      const secondValue = form.value[sourceTwo];
      if (firstValue * secondValue === parseInt(targetValue)) return null;
      return { multiplication: true }
    }
  }
}
