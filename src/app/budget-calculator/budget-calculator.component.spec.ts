import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCalculatorComponent } from './budget-calculator.component';

describe('BudgetCalculatorComponent', () => {
  let component: BudgetCalculatorComponent;
  let fixture: ComponentFixture<BudgetCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetCalculatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have access to budgetStateService', () => {
    expect(component.budgetStateService).toBeTruthy();
  });

  it('should initialize with total from budgetStateService', () => {
    expect(component.budgetStateService.total()).toBe(0);
  });

  it('should have servicesConfig for display', () => {
    expect(component.servicesConfig).toBeTruthy();
    expect(component.servicesConfig.length).toBe(3);
  });

  it('should render service cards from config', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const serviceCards = compiled.querySelectorAll('app-service-card');
    expect(serviceCards.length).toBe(3);
  });

  it('should display total from budgetStateService', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const totalElement = compiled.querySelector('#total-price');
    expect(totalElement?.textContent).toContain('0€');
  });
});
