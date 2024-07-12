import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SalaryCalculationResponse } from '../../models/salary-calculation-response';

@Component({
  selector: 'app-datos-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './datos-form.component.html',
  styleUrl: './datos-form.component.css',
})
export class DatosFormComponent {
  employeeForm: FormGroup;
  salaryResult: SalaryCalculationResponse | null = null;
  loginErrorMessage: string | null = null;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      hourlyWage: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      hoursWorked: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      overtimeHours: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.employeeForm.get(controlName);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }
}
