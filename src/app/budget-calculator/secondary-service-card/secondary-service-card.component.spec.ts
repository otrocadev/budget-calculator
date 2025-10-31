import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { SecondaryServiceCardComponent } from './secondary-service-card.component';
import type { SecondaryService } from '../../../config/servicesConfig';

describe('SecondaryServiceCardComponent', () => {
  let component: SecondaryServiceCardComponent;
  let fixture: ComponentFixture<SecondaryServiceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondaryServiceCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SecondaryServiceCardComponent);
    component = fixture.componentInstance;
  });

  // Arrange: Create mocks that will be used during the tests
  const mockedPages: SecondaryService = {
    title: 'pages',
    description: 'Additional pages for your website',
    price: 30,
    amount: 0,
    type: 'feature',
  };

  const mockedLanguages: SecondaryService = {
    title: 'languages',
    description: 'Add more language support',
    amount: 0,
    type: 'addOn',
  };

  it('should create pages section', () => {
    // Arrange
    fixture.componentRef.setInput('parentService', 'Web');
    fixture.componentRef.setInput('secondaryService', mockedPages);
    fixture.detectChanges();

    // Assert
    expect(component).toBeTruthy();
  });

  it('should create languages section', () => {
    // Arrange
    fixture.componentRef.setInput('parentService', 'Web');
    fixture.componentRef.setInput('secondaryService', mockedLanguages);
    fixture.detectChanges();

    // Assert
    expect(component).toBeTruthy();
  });

  it('should render with required inputs', () => {
    // Act
    const componentRef: ComponentRef<SecondaryServiceCardComponent> =
      fixture.componentRef;
    componentRef.setInput('parentService', 'Web');
    componentRef.setInput('secondaryService', mockedPages);
    fixture.detectChanges();

    // Assert
    expect(component).toBeTruthy();
    expect(component.secondaryService()).toEqual(mockedPages);
    expect(component.parentService()).toBe('Web');
  });

  it('should display "Number of additional " + the secondary service title in the template if it is an addOn', () => {
    // Act
    const componentRef: ComponentRef<SecondaryServiceCardComponent> =
      fixture.componentRef;
    componentRef.setInput('parentService', 'Web');
    componentRef.setInput('secondaryService', mockedLanguages);
    fixture.detectChanges();

    // Assert
    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('p');
    expect(titleElement?.textContent).toContain(
      'Number of additional languages'
    );
  });

  it('should display "Number of " + the secondary service title in the template if it is a feature', () => {
    // Act
    const componentRef: ComponentRef<SecondaryServiceCardComponent> =
      fixture.componentRef;
    componentRef.setInput('parentService', 'Web');
    componentRef.setInput('secondaryService', mockedPages);
    fixture.detectChanges();

    // Assert
    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('p');
    expect(titleElement?.textContent).toContain('Number of pages');
  });

  it('should render all interactive elements (buttons and input)', () => {
    // Act
    const componentRef: ComponentRef<SecondaryServiceCardComponent> =
      fixture.componentRef;
    componentRef.setInput('parentService', 'Web');
    componentRef.setInput('secondaryService', mockedLanguages);
    fixture.detectChanges();

    // Assert
    const compiled = fixture.nativeElement as HTMLElement;
    const infoButton = compiled.querySelector('.info-button');
    const amountButtons = compiled.querySelectorAll('.amount-button');
    const numberInput = compiled.querySelector('input[type="number"]');

    expect(infoButton).toBeTruthy();
    expect(amountButtons.length).toBe(2); // + and - buttons
    expect(numberInput).toBeTruthy();
  });

  it('should display initial amount from secondaryService', () => {
    // Act
    const componentRef: ComponentRef<SecondaryServiceCardComponent> =
      fixture.componentRef;
    componentRef.setInput('parentService', 'Web');
    componentRef.setInput('secondaryService', mockedLanguages);
    fixture.detectChanges();

    // Assert
    expect(component.secondaryService().amount).toBe(0);
  });

  it('should call budgetStateService.manageSecondaryService when amount changes', () => {
    // Arrange
    const componentRef: ComponentRef<SecondaryServiceCardComponent> =
      fixture.componentRef;
    componentRef.setInput('parentService', 'Web');
    componentRef.setInput('secondaryService', mockedPages);
    fixture.detectChanges();
    spyOn(component.budgetStateService, 'manageSecondaryService');

    // Act
    component.emitAmountChange();

    // Assert
    expect(
      component.budgetStateService.manageSecondaryService
    ).toHaveBeenCalledWith({
      parentService: 'Web',
      title: 'pages',
      amount: 0,
      type: 'feature',
      price: 30,
    });
  });
});
