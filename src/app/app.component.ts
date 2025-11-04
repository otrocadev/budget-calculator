import { Component } from '@angular/core';
import { BudgetCalculatorComponent } from './budget-calculator/budget-calculator.component';
import { HeaderComponent } from './header/header.component';
import { BudgetApplicationFormComponent } from './budget-application-form/budget-application-form.component';

@Component({
  selector: 'app-root',
  imports: [
    BudgetCalculatorComponent,
    HeaderComponent,
    BudgetApplicationFormComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'budget-calculator';
}
