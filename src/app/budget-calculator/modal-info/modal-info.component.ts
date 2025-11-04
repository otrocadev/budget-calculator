import { Component, inject } from '@angular/core';
import { DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-modal-info',
  imports: [],
  templateUrl: './modal-info.component.html',
  styleUrl: './modal-info.component.css',
})
export class ModalInfoComponent {
  data = inject<{ title: string; description: string; price?: number }>(
    DIALOG_DATA
  );

  get title() {
    return this.data.title;
  }

  get description() {
    return this.data.description;
  }

  get price() {
    return this.data.price;
  }
}
