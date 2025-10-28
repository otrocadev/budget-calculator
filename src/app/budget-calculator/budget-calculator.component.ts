import { Component, signal, computed } from '@angular/core';
import { ServiceCardComponent } from './service-card/service-card.component';
import { servicesData } from '../../data/servicesData';

@Component({
  selector: 'app-budget-calculator',
  imports: [ServiceCardComponent],
  templateUrl: './budget-calculator.component.html',
  styleUrl: './budget-calculator.component.css',
})
export class BudgetCalculatorComponent {
  servicesData = servicesData;
  serviceTotals = signal<
    { service: string; price: number; selected: boolean }[]
  >([]);
  total = computed(() => {
    return this.serviceTotals().reduce((sum, item) => sum + item.price, 0);
  });

  manageServiceTotals({
    service,
    price,
    selected,
  }: {
    service: string;
    price: number;
    selected: boolean;
  }) {
    this.serviceTotals.update((totals) => {
      const existingIndex = totals.findIndex((s) => s.service === service);

      if (selected) {
        if (existingIndex !== -1) {
          const updated = [...totals];
          updated[existingIndex] = { service, price, selected };
          return updated;
        } else {
          return [...totals, { service, price, selected }];
        }
      } else {
        if (existingIndex !== -1) {
          return totals.filter((_, index) => index !== existingIndex);
        }
        return totals;
      }
    });
  }
}
