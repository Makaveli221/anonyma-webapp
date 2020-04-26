import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  public static getValidationErrorMessage(validatorName: string, validatorValue?: any, labelName?: string): any {
    const config = {
      required: `Ce champ est obligatoire.`,
      invalidPassword: 'Mot de passe invalide. Le mot de passe doit être d’au moins 6 caractères de long, et contenir un nombre.',
      max: `Le champ ne peut être supérieur à ${validatorValue.max}.`,
      min: `Le champ doit être supérieur au moins ${validatorValue.min}.`,
      maxlength: `Le champ ne peut contenir plus de ${validatorValue.requiredLength} caractères.`,
      minlength: `Le champ doit contenir au moins ${validatorValue.requiredLength} caractères.`,
      mustMatch: `Passwords must match`,
      pattern: `Ce champ est invalide.`
    };

    return config[validatorName];
  }

  public static passwordValidator(control: AbstractControl): any {
    if (!control.value) { return; }

    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    // (?!.*\s)          - Spaces are not allowed
    return (control.value.match(/^(?=.*\d)(?=.*[a-zA-Z!@#$%^&*])(?!.*\s).{6,100}$/)) ? '' : { invalidPassword: true };
  }
}
