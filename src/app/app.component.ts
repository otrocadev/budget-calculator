import { Component } from '@angular/core';
import { BudgetCalculatorComponent } from './budget-calculator/budget-calculator.component';

@Component({
  selector: 'app-root',
  imports: [BudgetCalculatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'budget-calculator';
}
