import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import type { SecondaryService } from '../../../data/servicesData';
import { FormsModule } from '@angular/forms';
import { ModalInfoComponent } from '../../modal-info/modal-info.component';
import { Dialog } from '@angular/cdk/dialog';

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

  amountCounter: number = 0;

  ngOnInit() {
    this.amountCounter = this.secondaryService.amount;
  }

  emitAmountChange() {
    this.amountChangeEvent.emit({
      service: this.secondaryService.title,
      amount: this.amountCounter,
    });
  }

  reduceAmount() {
    if (this.amountCounter > 0) {
      this.amountCounter--;
      this.emitAmountChange();
    }
  }

  increaseAmount() {
    if (this.amountCounter < 20) {
      this.amountCounter++;
      this.emitAmountChange();
    }
  }

  dialog = inject(Dialog);
  openDialog() {
    this.dialog.open(ModalInfoComponent, {
      data: {
        title: this.secondaryService.title,
        description: this.secondaryService.description,
        price: this.secondaryService.price,
      },
    });
  }
}
