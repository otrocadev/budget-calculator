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
  selectedServices: string[] = [];
  total: number = 0;

  constructor() {
    this.servicesData.forEach((service) => {
      service.selected ? this.addService(service.title) : null;
      console.log(this.selectedServices);
    });
    this.calculateTotal();
  }

  manageService(title: string) {
    this.selectedServices.includes(title)
      ? this.removeService(title)
      : this.addService(title);
    console.log(this.selectedServices);
  }

  removeService(title: string) {
    this.selectedServices.splice(this.selectedServices.indexOf(title), 1);
  }

  addService(title: string) {
    this.selectedServices.push(title);
  }

  calculateTotal() {}
}
