import { Component, Input, Output, EventEmitter } from '@angular/core';
import type { SecondaryService } from '../../../data/servicesData';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-secondary-service-card',
  imports: [FormsModule],
  templateUrl: './secondary-service-card.component.html',
  styleUrl: './secondary-service-card.component.css',
})
export class SecondaryServiceCardComponent {
  @Input() secondaryService!: SecondaryService;
  @Output() amountChangeEvent = new EventEmitter<{
    service: string;
    amount: number;
  }>();

  amountChange() {
    this.amountChangeEvent.emit({
      service: this.secondaryService.title,
      amount: this.secondaryService.amount,
    });
  }

  reduceAmount() {
    if (this.secondaryService.amount > 0) {
      this.secondaryService.amount = this.secondaryService.amount - 1;
    }
    this.amountChange();
  }

  increaseAmount() {
    if (this.secondaryService.amount < 20) {
      this.secondaryService.amount = this.secondaryService.amount + 1;
    }
    this.amountChange();
  }
}
