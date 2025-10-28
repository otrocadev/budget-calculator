import { Component, computed, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import type { Service } from '../../../data/servicesData';
import { SecondaryServiceCardComponent } from '../secondary-service-card/secondary-service-card.component';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [FormsModule, NgClass, SecondaryServiceCardComponent],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css',
})
export class ServiceCardComponent {
  service = input.required<Service>();
  selectedChange = output<{
    service: string;
    price: number;
    selected: boolean;
  }>();

  serviceTotal: number = 0;
  title = computed(() => this.service().title);
  price = computed(() => this.service().price);
  selected = computed(() => this.service().selected);

  secondaryServicesChange({
    service,
    amount,
  }: {
    service: string;
    amount: number;
  }) {
    const secondaryService = this.service().secondaryServices?.find(
      (s) => s.title === service
    );
    if (secondaryService) {
      secondaryService.amount = amount;
    }
    this.calculateTotal();
  }

  onCheckboxChange() {
    this.calculateTotal();
  }

  manageSecondaryServiceAmount() {
    let featuresAmount = 0;
    let addOnsAmount = 0;

    this.service().secondaryServices?.forEach((secondaryService) => {
      if (secondaryService.amount > 0) {
        if (secondaryService.type === 'feature') {
          featuresAmount += secondaryService.amount * secondaryService.price!;
        } else {
          addOnsAmount += secondaryService.amount;
        }
      }
    });

    return featuresAmount * addOnsAmount;
  }

  calculateTotal() {
    this.serviceTotal = 0;
    this.serviceTotal = this.price() + this.manageSecondaryServiceAmount();

    this.selectedChange.emit({
      service: this.title(),
      price: this.serviceTotal,
      selected: this.selected(),
    });
  }
}
