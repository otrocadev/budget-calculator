import { Component, input } from '@angular/core';
import type { BudgetInfo } from '../../../types/budgetTypes';

@Component({
  selector: 'app-budget-info-card',
  imports: [],
  templateUrl: './budget-info-card.component.html',
  styleUrl: './budget-info-card.component.css',
})
export class BudgetInfoCardComponent {
  budget = input<BudgetInfo>();
}
