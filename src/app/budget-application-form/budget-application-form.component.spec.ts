import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetApplicationFormComponent } from './budget-application-form.component';
import { signal, WritableSignal } from '@angular/core';
import { BudgetStateService } from '../../services/budgetStatusService';
import type { Service } from '../../types/budgetStatusTypes';

describe('BudgetApplicationFormComponent', () => {
  let component: BudgetApplicationFormComponent;
  let fixture: ComponentFixture<BudgetApplicationFormComponent>;
  let mockBudgetStateService: {
    services: WritableSignal<Service[]>;
    total: WritableSignal<number>;
  };

  beforeEach(async () => {
    mockBudgetStateService = {
      services: signal<Service[]>([]),
      total: signal(0),
    };

    await TestBed.configureTestingModule({
      imports: [BudgetApplicationFormComponent],
      providers: [
        { provide: BudgetStateService, useValue: mockBudgetStateService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetApplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an error message when there are no services selected', () => {
    mockBudgetStateService.services.set([
      { title: 'SEO', description: 'SEO service', price: 300, selected: false },
      { title: 'Ads', description: 'Ads service', price: 400, selected: false },
    ]);
    mockBudgetStateService.total.set(0);
    component.formData.name = 'John Doe';
    component.formData.email = 'john.doe@gmail.com';
    component.formData.phone = '123456789';
    component.onSubmit();

    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toBe(
      'You need to select at least one service to create a budget'
    );
  });

  it('should display an error message when name is empty', () => {
    mockBudgetStateService.services.set([
      {
        title: 'SEO',
        description: 'SEO service',
        price: 300,
        selected: true,
      },
    ]);
    mockBudgetStateService.total.set(300);
    component.formData.name = '';
    component.onSubmit();

    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toBe('Name is required');
  });

  it('should display an error message when name is not a string', () => {
    mockBudgetStateService.services.set([
      {
        title: 'SEO',
        description: 'SEO service',
        price: 300,
        selected: true,
      },
    ]);
    mockBudgetStateService.total.set(300);
    // @ts-ignore
    component.formData.name = 123;
    component.onSubmit();

    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toBe('Name must be a string');
  });

  it('should display an error message when name is not enough characters', () => {
    mockBudgetStateService.services.set([
      {
        title: 'SEO',
        description: 'SEO service',
        price: 300,
        selected: true,
      },
    ]);
    mockBudgetStateService.total.set(300);
    component.formData.name = 'b';
    component.onSubmit();

    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toBe(
      'Name must be at least 2 characters long'
    );
  });

  it('should display an error message when name is not letters only', () => {
    mockBudgetStateService.services.set([
      {
        title: 'SEO',
        description: 'SEO service',
        price: 300,
        selected: true,
      },
    ]);
    mockBudgetStateService.total.set(300);
    component.formData.name = '123';
    component.onSubmit();

    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toBe('Name must contain only letters');
  });

  it('should display an error message when email is empty', () => {
    mockBudgetStateService.services.set([
      {
        title: 'SEO',
        description: 'SEO service',
        price: 300,
        selected: true,
      },
    ]);
    mockBudgetStateService.total.set(300);
    component.formData.name = 'John Doe';
    component.formData.email = '';
    component.onSubmit();

    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toBe('Email is required');
  });

  it('should display an error message when email is not a string', () => {
    mockBudgetStateService.services.set([
      {
        title: 'SEO',
        description: 'SEO service',
        price: 300,
        selected: true,
      },
    ]);
    mockBudgetStateService.total.set(300);
    // @ts-ignore
    component.formData.email = 123;
    component.formData.name = 'John Doe';
    component.onSubmit();

    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toBe('Email must be a string');
  });

  it('should display an error message when email does not contain an @', () => {
    mockBudgetStateService.services.set([
      {
        title: 'SEO',
        description: 'SEO service',
        price: 300,
        selected: true,
      },
    ]);
    mockBudgetStateService.total.set(300);
    component.formData.name = 'John Doe';
    component.formData.email = '123';
    component.onSubmit();

    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toBe('Email must contain @');
  });

  it('should display an error message when email does not contain a dot after @', () => {
    mockBudgetStateService.services.set([
      {
        title: 'SEO',
        description: 'SEO service',
        price: 300,
        selected: true,
      },
    ]);
    mockBudgetStateService.total.set(300);
    component.formData.name = 'John Doe';
    component.formData.email = '123@';
    component.onSubmit();

    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toBe(
      'Email must contain a dot after an @'
    );
  });

  it('should display an error message when email does contain a dot before @ and not after', () => {
    mockBudgetStateService.services.set([
      {
        title: 'SEO',
        description: 'SEO service',
        price: 300,
        selected: true,
      },
    ]);
    mockBudgetStateService.total.set(300);
    component.formData.name = 'John Doe';
    component.formData.email = 'john.doe@';
    component.onSubmit();

    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toBe(
      'Email must contain a dot after an @'
    );
  });

  it('should display an error message when phone is empty', () => {
    mockBudgetStateService.services.set([
      {
        title: 'SEO',
        description: 'SEO service',
        price: 300,
        selected: true,
      },
    ]);
    mockBudgetStateService.total.set(300);
    component.formData.name = 'John Doe';
    component.formData.email = 'john.doe@gmail.com';
    component.formData.phone = '';
    component.onSubmit();

    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toBe('Phone is required');
  });

  it('should display an error message when phone is not a string', () => {
    mockBudgetStateService.services.set([
      {
        title: 'SEO',
        description: 'SEO service',
        price: 300,
        selected: true,
      },
    ]);
    mockBudgetStateService.total.set(300);
    // @ts-ignore
    component.formData.phone = 123;
    component.formData.name = 'John Doe';
    component.formData.email = 'john.doe@gmail.com';
    component.onSubmit();

    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toBe('Phone must be a string');
  });

  it('should display an error message when phone does not contain only numbers', () => {
    mockBudgetStateService.services.set([
      {
        title: 'SEO',
        description: 'SEO service',
        price: 300,
        selected: true,
      },
    ]);
    mockBudgetStateService.total.set(300);
    component.formData.name = 'John Doe';
    component.formData.email = 'john.doe@gmail.com';
    component.formData.phone = '123a';
    component.onSubmit();

    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toBe('Phone must contain only numbers');
  });

  it('should display an error message when phone does not contain enough characters', () => {
    mockBudgetStateService.services.set([
      {
        title: 'SEO',
        description: 'SEO service',
        price: 300,
        selected: true,
      },
    ]);
    mockBudgetStateService.total.set(300);
    component.formData.name = 'John Doe';
    component.formData.email = 'john.doe@gmail.com';
    component.formData.phone = '123';
    component.onSubmit();

    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toBe(
      'Phone must be at least 6 characters long'
    );
  });

  it('should display an error message when phone does contain too many characters', () => {
    mockBudgetStateService.services.set([
      {
        title: 'SEO',
        description: 'SEO service',
        price: 300,
        selected: true,
      },
    ]);
    mockBudgetStateService.total.set(300);
    component.formData.name = 'John Doe';
    component.formData.email = 'john.doe@gmail.com';
    component.formData.phone = '1234567890154545';
    component.onSubmit();

    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toBe(
      'Phone must be at most 9 characters long'
    );
  });
});
