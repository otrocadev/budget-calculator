import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BudgetListService } from '../../services/budgetListService';

@Component({
  selector: 'app-budget-application-form',
  imports: [FormsModule],
  templateUrl: './budget-application-form.component.html',
  styleUrl: './budget-application-form.component.css',
})
export class BudgetApplicationFormComponent {
  budgetListService = inject(BudgetListService);

  formData = {
    name: '',
    email: '',
    phone: '',
  };

  onSubmit() {
    this.budgetListService.addBudget({
      name: this.formData.name,
      email: this.formData.email,
      phone: this.formData.phone,
      budgetServices: {
        services: [{ title: 'patata' }],
      },
      total: 20,
    });
    console.log(this.formData);
    console.log(this.budgetListService.errorStatus());
    console.log(this.budgetListService.listOfBudgets());
  }
}
