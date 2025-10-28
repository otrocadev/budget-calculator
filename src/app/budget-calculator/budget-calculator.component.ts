import { Component, signal } from '@angular/core';
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
  serviceTotals: { service: string; price: number; selected: boolean }[] = [];

  total = signal(0);

  constructor() {
    this.calculateTotal();
  }

  manageServiceTotals({
    service,
    price,
    selected,
  }: {
    service: string;
    price: number;
    selected: boolean;
  }) {
    const existingIndex = this.serviceTotals.findIndex(
      (s) => s.service === service
    );

    if (selected) {
      if (existingIndex !== -1) {
        this.serviceTotals[existingIndex] = { service, price, selected };
      } else {
        this.serviceTotals.push({ service, price, selected });
      }
    } else {
      if (existingIndex !== -1) {
        this.serviceTotals.splice(existingIndex, 1);
      }
    }
    this.calculateTotal();
  }

  calculateTotal() {
    this.total.set(0);
    this.serviceTotals.forEach((totalServiceAmount) => {
      this.total.update((total) => total + totalServiceAmount.price);
    });
  }
}
