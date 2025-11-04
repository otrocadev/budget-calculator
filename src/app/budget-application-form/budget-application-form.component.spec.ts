import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetApplicationFormComponent } from './budget-application-form.component';

describe('BudgetApplicationFormComponent', () => {
  let component: BudgetApplicationFormComponent;
  let fixture: ComponentFixture<BudgetApplicationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetApplicationFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetApplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an error message when name is empty', () => {
    component.formData.name = '';
    component.onSubmit();

    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toBe('Name is required');
  });

  it('should display an error message when name is not a string', () => {
    // @ts-ignore
    component.formData.name = 123;
    component.onSubmit();

    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toBe('Name must be a string');
  });

  it('should display an error message when name is not enough characters', () => {
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
    component.formData.name = '123';
    component.onSubmit();

    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toBe('Name must contain only letters');
  });

  it('should display an error message when email is empty', () => {
    component.formData.name = 'John Doe';
    component.formData.email = '';
    component.onSubmit();

    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toBe('Email is required');
  });

  it('should display an error message when email is not a string', () => {
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
    component.formData.name = 'John Doe';
    component.formData.email = '123';
    component.onSubmit();

    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toBe('Email must contain @');
  });

  it('should display an error message when email does not contain a dot after @', () => {
    component.formData.name = 'John Doe';
    component.formData.email = '123@';
    component.onSubmit();

    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toBe('Email must contain .');
  });

  it('should display an error message when email does contain a dot before @ and not after', () => {
    component.formData.name = 'John Doe';
    component.formData.email = 'john.doe@';
    component.onSubmit();

    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toBe('Email must contain .');
  });

  it('should display an error message when phone is empty', () => {
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
