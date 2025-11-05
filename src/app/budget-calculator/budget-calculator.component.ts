import { Component, inject } from '@angular/core';
import { ServiceCardComponent } from './service-card/service-card.component';
import { servicesConfig } from '../../config/servicesConfig';
import { BudgetStateService } from '../../services/budgetStatusService';
import { Router, ActivatedRoute } from '@angular/router';

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

  // Routes to manage params from url
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    this.route.queryParams.subscribe((params) => {
      this.applyParamsToServices(params);
    });
  }

  private applyParamsToServices(params: any) {
    const services = this.budgetStateService.services();

    services.forEach((service) => {
      const isSelected = params[service.title.toLowerCase()] === 'true';
      if (isSelected !== service.selected) {
        this.budgetStateService.manageService({
          ...service,
          selected: isSelected,
        });
      }
    });

    // the timeout is needed to wait for the main services to be updated before updating the secondary services
    setTimeout(() => {
      const updatedServices = this.budgetStateService.services();
      updatedServices.forEach((service) => {
        if (service.secondaryServices && service.selected) {
          service.secondaryServices.forEach((secondary) => {
            const paramKey = `${service.title.toLowerCase()}_${
              secondary.title
            }`;
            const amount = params[paramKey];

            if (amount !== undefined && amount !== null) {
              this.budgetStateService.manageSecondaryService({
                parentService: service.title,
                title: secondary.title,
                amount: parseInt(amount, 10),
                type: secondary.type,
                price: secondary.price,
              });
            }
          });
        }
      });
    }, 0);
  }
}
