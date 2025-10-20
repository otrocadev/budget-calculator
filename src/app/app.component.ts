import { Component } from '@angular/core';
import { BudgetCalculatorComponent } from './budget-calculator/budget-calculator.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  imports: [BudgetCalculatorComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'budget-calculator';
}
