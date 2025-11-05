import { Component, input, inject, signal, Signal } from '@angular/core';
import type { SecondaryService } from '../../../config/servicesConfig';
import { FormsModule } from '@angular/forms';
import { ModalInfoComponent } from '../modal-info/modal-info.component';
import { Dialog } from '@angular/cdk/dialog';
import { BudgetStateService } from '../../../services/budgetStatusService';

@Component({
  selector: 'app-secondary-service-card',
  imports: [FormsModule],
  templateUrl: './secondary-service-card.component.html',
  styleUrl: './secondary-service-card.component.css',
})
export class SecondaryServiceCardComponent {
  parentService = input.required<string>();
  secondaryService = input.required<SecondaryService>();
  budgetStateService = inject(BudgetStateService);

  emitAmountChange() {
    this.budgetStateService.manageSecondaryService({
      parentService: this.parentService(),
      title: this.secondaryService().title,
      amount: this.secondaryService().amount,
      type: this.secondaryService().type,
      price: this.secondaryService().price,
    });
  }

  reduceAmount() {
    if (this.secondaryService().amount > 0) {
      this.secondaryService().amount = this.secondaryService().amount - 1;
      this.emitAmountChange();
    }
  }

  increaseAmount() {
    if (this.secondaryService().amount < 20) {
      this.secondaryService().amount = this.secondaryService().amount + 1;
      this.emitAmountChange();
    }
  }

  dialog = inject(Dialog);
  openDialog() {
    this.dialog.open(ModalInfoComponent, {
      data: {
        title: this.secondaryService().title,
        description: this.secondaryService().description,
        price: this.secondaryService().price,
      },
    });
  }
}
