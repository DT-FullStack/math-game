import { AbstractControl, ValidationErrors } from "@angular/forms";

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
}
