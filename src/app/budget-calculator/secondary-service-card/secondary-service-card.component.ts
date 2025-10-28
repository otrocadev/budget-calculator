import { Component, input, output, inject, computed } from '@angular/core';
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
  secondaryService = input.required<SecondaryService>();
  serviceAmount = output<{ service: string; amount: number }>();

  amountCounter: number = 0;

  title = computed(() => this.secondaryService().title);
  description = computed(() => this.secondaryService().description);
  price = computed(() => this.secondaryService().price);
  secondaryServiceAmount = computed(() => this.secondaryService().amount);

  emitAmountChange() {
    this.serviceAmount.emit({
      service: this.secondaryService().title,
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
        title: this.title(),
        description: this.description(),
        price: this.price(),
      },
    });
  }
}
