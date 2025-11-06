import { Component, effect, inject, untracked } from '@angular/core';
import { ServiceCardComponent } from './service-card/service-card.component';
import { servicesConfig } from '../../config/servicesConfig';
import { BudgetStateService } from '../../services/budgetStatusService';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Service } from '../../types/budgetStatusTypes';

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
  private isApplyingParams = false;

  constructor() {
    this.route.queryParams.subscribe((params) => {
      this.isApplyingParams = true;
      this.applyParamsToServices(params);
      setTimeout(() => (this.isApplyingParams = false), 100);
    });

    effect(() => {
      const services = this.budgetStateService.services();

      untracked(() => {
        if (!this.isApplyingParams) {
          this.updateUrlFromServices(services);
        }
      });
    });
  }

  private applyParamsToServices(params: Params) {
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

  private updateUrlFromServices(services: Service[]) {
    const queryParams: Params = {};

    services.forEach((service) => {
      if (service.selected) {
        queryParams[service.title.toLowerCase()] = 'true';

        // adding secondary services in case that the service have them
        if (service.secondaryServices) {
          service.secondaryServices.forEach((secondary) => {
            if (secondary.amount > 0) {
              const paramKey = `${service.title.toLowerCase()}_${
                secondary.title
              }`;
              queryParams[paramKey] = secondary.amount;
            }
          });
        }
      }
    });

    // replace the url with the new params created
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      replaceUrl: true,
    });
  }
}
