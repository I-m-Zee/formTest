import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormFields } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  constructor() { }

  toFormGroup(inputs:FormFields<string>[]):FormGroup {
    const group:any={};
    inputs.forEach(input => {
      let validator: ValidatorFn[]=input.required?[Validators.required]:[];
      switch(input.validator){
        case 'email':
          validator.push(Validators.email);
          break;
        default:
          break;
      }
      group[input.key]=validator.length>0?new FormControl(input.options.val||'',validator):new FormControl(input.value||'');
      
    });
    return new FormGroup(group);
  }
}
