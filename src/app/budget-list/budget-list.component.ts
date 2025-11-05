import { Component, inject, signal } from '@angular/core';
import { BudgetListService } from '../../services/budgetListService';
import { BudgetInfoCardComponent } from './budget-info-card/budget-info-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-budget-list',
  imports: [BudgetInfoCardComponent, FormsModule],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.css',
})
export class BudgetListComponent {
  budgetListService = inject(BudgetListService);

  search = signal('');

  onSubmit() {
    this.budgetListService.searchByName(this.search());
  }
}
