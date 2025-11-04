import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BudgetListService } from '../../services/budgetListService';
import { BudgetStateService } from '../../services/budgetStatusService';
import type { BudgetService } from '../../types/budgetTypes';
import { ERROR_MESSAGES } from '../../config/errorMessageConfig';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-budget-application-form',
  imports: [FormsModule, NgClass],
  templateUrl: './budget-application-form.component.html',
  styleUrl: './budget-application-form.component.css',
})
export class BudgetApplicationFormComponent {
  budgetListService = inject(BudgetListService);
  budgetStateService = inject(BudgetStateService);

  private services: BudgetService[] = [];
  ERROR_MESSAGES = ERROR_MESSAGES;

  errorStatusMessage = signal<string | undefined>(undefined);

  formData = {
    name: '',
    email: '',
    phone: '',
  };

  private getErrorStatus() {
    this.errorStatusMessage.set(
      ERROR_MESSAGES[this.budgetListService.errorStatus()[0]][
        this.budgetListService.errorStatus()[1]
      ]
    );
  }

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
    this.getErrorStatus();
  }
}
