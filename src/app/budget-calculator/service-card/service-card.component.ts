import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css',
})
export class ServiceCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() price!: number;
  @Input() selected: boolean = false;
  @Output() selectedChange = new EventEmitter<string>();

  onCheckboxChange() {
    this.selectedChange.emit(this.title);
  }
}
