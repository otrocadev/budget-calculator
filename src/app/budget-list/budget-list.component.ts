import { Component, inject } from '@angular/core';
import { BudgetListService } from '../../services/budgetListService';
import { BudgetInfoCardComponent } from './budget-info-card/budget-info-card.component';

@Component({
  selector: 'app-budget-list',
  imports: [BudgetInfoCardComponent],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.css',
})
export class BudgetListComponent {
  budgetListService = inject(BudgetListService);
}
