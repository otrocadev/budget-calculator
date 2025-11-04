import { Component, inject, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BudgetListService } from '../../services/budgetListService';
import { BudgetStateService } from '../../services/budgetStatusService';
import type { BudgetService } from '../../types/budgetTypes';

@Component({
  selector: 'app-budget-application-form',
  imports: [FormsModule],
  templateUrl: './budget-application-form.component.html',
  styleUrl: './budget-application-form.component.css',
})
export class BudgetApplicationFormComponent {
  budgetListService = inject(BudgetListService);
  budgetStateService = inject(BudgetStateService);

  private services: BudgetService[] = [];

  formData = {
    name: '',
    email: '',
    phone: '',
  };

  private manageServices() {
    this.services = [];
    this.budgetStateService.services().forEach((service) => {
      if (service.selected) {
        let newService = {
          title: service.title,
          secondaryServices: service.secondaryServices,
        };
        this.services.push(newService);
      }
    });
  }

  onSubmit() {
    this.manageServices();
    this.budgetListService.addBudget({
      name: this.formData.name,
      email: this.formData.email,
      phone: this.formData.phone,
      budgetServices: {
        services: this.services,
      },
      total: this.budgetStateService.total(),
    });
  }
}
