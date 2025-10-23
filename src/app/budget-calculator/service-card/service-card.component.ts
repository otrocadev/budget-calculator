import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() service!: Service;
  @Output() selectedChange = new EventEmitter<{
    service: string;
    price: number;
    selected: boolean;
  }>();
  serviceTotal: number = 0;

  secondaryServicesChange({
    service,
    amount,
  }: {
    service: string;
    amount: number;
  }) {
    const secondaryService = this.service.secondaryServices?.find(
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

    this.service.secondaryServices?.forEach((secondaryService) => {
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
    this.serviceTotal =
      this.service.price + this.manageSecondaryServiceAmount();

    this.selectedChange.emit({
      service: this.service.title,
      price: this.serviceTotal,
      selected: this.service.selected,
    });
  }
}
