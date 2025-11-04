import { Injectable, signal } from '@angular/core';
import type { SecondaryService } from '../config/servicesConfig';
import { servicesConfig } from '../config/servicesConfig';

type Service = {
  title: string;
  price: number;
  selected: boolean;
  secondaryServices?: SecondaryService[];
};

type SecondaryServiceState = {
  parentService: string;
  title: string;
  amount: number;
  type: 'addOn' | 'feature';
  price?: number;
};

@Injectable({ providedIn: 'root' })
export class BudgetStateService {
  private _total = signal(0);
  private _services = signal<Service[]>(
    JSON.parse(JSON.stringify(servicesConfig))
  );

  public total = this._total.asReadonly();
  public services = this._services.asReadonly();

  private updateTotal() {
    const total = this._services()
      .filter((s) => s.selected)
      .reduce((totalAmount, service) => {
        totalAmount += service.price;
        if (service.secondaryServices) {
          let featuresTotal = 0;
          let addOnsTotal = 1;
          for (const secondaryService of service.secondaryServices) {
            if (secondaryService.type === 'feature') {
              featuresTotal +=
                secondaryService.price! * secondaryService.amount;
            }
            if (secondaryService.type === 'addOn') {
              addOnsTotal += secondaryService.amount;
            }
          }
          totalAmount = totalAmount + featuresTotal * addOnsTotal;
        }
        return totalAmount;
      }, 0);
    this._total.set(total);
  }

  // Main services management
  public manageService(service: Service) {
    this._services.update((services) =>
      services.map((s) =>
        s.title === service.title ? { ...s, selected: service.selected } : s
      )
    );
    this.updateTotal();
  }

  // Secondary services management
  public manageSecondaryService(service: SecondaryServiceState) {
    this._services.update((services) => {
      services.map((parentService) => {
        if (parentService.title === service.parentService) {
          parentService.secondaryServices?.map((secondaryServiceToUpdate) => {
            if (secondaryServiceToUpdate.title === service.title) {
              secondaryServiceToUpdate.amount = service.amount;
            }
          });
        }
      });
      return services;
    });
    this.updateTotal();
  }
}
