import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SalaryCalculationResponse } from '../../models/salary-calculation-response';
import { SalaryCalculationRequest } from '../../models/salary-calculation-request';
import { CalcSalaryService } from '../../services/calc-salary.service';

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

  constructor(
    private fb: FormBuilder,
    private calcSalaryService: CalcSalaryService
  ) {
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

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const formValue = this.employeeForm.value;
      const request: SalaryCalculationRequest = {
        name: formValue.name,
        hourlyWage: parseFloat(formValue.hourlyWage),
        hoursWorked: parseInt(formValue.hoursWorked, 10),
        overtimeHours: parseInt(formValue.overtimeHours, 10),
      };

      this.salaryResult = this.calcSalaryService.calculateSalary(request);
      this.loginErrorMessage = null;
    } else {
      this.loginErrorMessage = 'Please fill in all required fields correctly.';
    }
  }
}
