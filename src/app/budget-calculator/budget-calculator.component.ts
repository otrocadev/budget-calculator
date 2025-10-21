import { Component } from '@angular/core';
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
  total: number = 0;

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
    if (selected) {
      this.serviceTotals.push({ service, price, selected });
    } else {
      this.serviceTotals = this.serviceTotals.filter((totalServiceAmount) => {
        return totalServiceAmount.service !== service;
      });
    }
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = 0;
    this.serviceTotals.forEach((totalServiceAmount) => {
      this.total = this.total + totalServiceAmount.price;
    });
  }
}
