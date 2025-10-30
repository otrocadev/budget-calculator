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

  it('should initialize with the camp total of 0', () => {
    expect(component.total).toBe(0);
  });

  it('should calculate total when a service is selected', () => {
    // Arrange
    const serviceData = {
      service: 'SEO',
      price: 300,
      selected: true,
    };

    // Act
    component.manageServiceTotals(serviceData);

    // Assert
    expect(component.total).toBe(300);
    expect(component.serviceTotals.length).toBe(1);
  });

  it('should add multiple services to total', () => {
    // Arrange & Act
    component.manageServiceTotals({
      service: 'SEO',
      price: 300,
      selected: true,
    });
    component.manageServiceTotals({
      service: 'Ads',
      price: 400,
      selected: true,
    });
    component.manageServiceTotals({
      service: 'Web',
      price: 500,
      selected: true,
    });

    // Assert
    expect(component.total).toBe(1200);
    expect(component.serviceTotals.length).toBe(3);
  });

  it('should remove service from total when deselected', () => {
    // Arrange
    component.manageServiceTotals({
      service: 'SEO',
      price: 300,
      selected: true,
    });
    component.manageServiceTotals({
      service: 'Ads',
      price: 400,
      selected: true,
    });
    expect(component.total).toBe(700);

    // Act - deselect SEO
    component.manageServiceTotals({
      service: 'SEO',
      price: 300,
      selected: false,
    });

    // Assert
    expect(component.total).toBe(400);
    expect(component.serviceTotals.length).toBe(1);
  });

  it('should handle deselecting a non-existent service', () => {
    // Arrange
    component.manageServiceTotals({
      service: 'SEO',
      price: 300,
      selected: true,
    });

    // Act - try to deselect a service that was never added
    component.manageServiceTotals({
      service: 'NonExistent',
      price: 100,
      selected: false,
    });

    // Assert
    expect(component.total).toBe(300);
    expect(component.serviceTotals.length).toBe(1);
  });

  it('should recalculate total correctly after multiple operations', () => {
    // Add services
    component.manageServiceTotals({
      service: 'SEO',
      price: 300,
      selected: true,
    });
    component.manageServiceTotals({
      service: 'Ads',
      price: 400,
      selected: true,
    });
    component.manageServiceTotals({
      service: 'Web',
      price: 500,
      selected: true,
    });
    expect(component.total).toBe(1200);

    // Remove one
    component.manageServiceTotals({
      service: 'Ads',
      price: 400,
      selected: false,
    });
    expect(component.total).toBe(800);

    // Update one
    component.manageServiceTotals({
      service: 'Web',
      price: 650,
      selected: true,
    });
    expect(component.total).toBe(950);

    // Remove all
    component.manageServiceTotals({
      service: 'SEO',
      price: 300,
      selected: false,
    });
    component.manageServiceTotals({
      service: 'Web',
      price: 650,
      selected: false,
    });
    expect(component.total).toBe(0);
  });
});
