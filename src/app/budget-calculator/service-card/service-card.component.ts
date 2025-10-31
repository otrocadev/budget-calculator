import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import type { Service } from '../../../config/servicesConfig';
import { SecondaryServiceCardComponent } from '../secondary-service-card/secondary-service-card.component';
import { BudgetStateService } from '../../../services/budgetStatusService';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [FormsModule, NgClass, SecondaryServiceCardComponent],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css',
})
export class ServiceCardComponent {
  @Input() service!: Service;

  budgetStateService = inject(BudgetStateService);

  onCheckboxChange() {
    this.budgetStateService.manageService({
      title: this.service.title,
      price: this.service.price,
      selected: this.service.selected,
      secondaryServices: this.service.secondaryServices,
    });
  }
}
