import { Component, inject } from '@angular/core';
import { ServiceCardComponent } from './service-card/service-card.component';
import { servicesConfig } from '../../config/servicesConfig';
import { BudgetStateService } from '../../services/budgetStatusService';

@Component({
  selector: 'app-budget-calculator',
  imports: [ServiceCardComponent],
  templateUrl: './budget-calculator.component.html',
  styleUrl: './budget-calculator.component.css',
})
export class BudgetCalculatorComponent {
  // config to show in the UI
  servicesConfig = servicesConfig;

  // injecting the states of the status service
  budgetStateService = inject(BudgetStateService);
}
