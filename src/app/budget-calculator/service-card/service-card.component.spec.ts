import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceCardComponent } from './service-card.component';
import type { Service } from '../../../config/servicesConfig';

describe('ServiceCardComponent', () => {
  let component: ServiceCardComponent;
  let fixture: ComponentFixture<ServiceCardComponent>;

  // Mock services for testing
  const mockedSEOService: Service = {
    title: 'SEO',
    description: "Programació d'una web responsive complerta",
    price: 300,
    selected: false,
  };

  const mockedWebService: Service = {
    title: 'Web',
    description: "Programació d'una web responsive complerta",
    price: 500,
    selected: false,
    secondaryServices: [
      {
        title: 'pages',
        type: 'feature',
        price: 30,
        description: 'Add the pages that your website will have',
        amount: 0,
      },
      {
        title: 'languages',
        type: 'addOn',
        description: 'Choose the languages for your website',
        amount: 0,
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceCardComponent);
    component = fixture.componentInstance;
  });

  it('should create with SEO service', () => {
    // Arrange
    component.service = mockedSEOService;
    fixture.detectChanges();

    // Assert
    expect(component).toBeTruthy();
  });

  it('should create with Web service', () => {
    // Arrange
    component.service = mockedWebService;
    fixture.detectChanges();

    // Assert
    expect(component).toBeTruthy();
  });

  it('should render service title and description', () => {
    // Arrange
    component.service = mockedSEOService;
    fixture.detectChanges();

    // Assert
    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('.service-title');
    expect(titleElement?.textContent).toContain('SEO');
  });

  it('should render service price', () => {
    // Arrange
    component.service = mockedSEOService;
    fixture.detectChanges();

    // Assert
    const compiled = fixture.nativeElement as HTMLElement;
    const priceElement = compiled.querySelector('.service-price');
    expect(priceElement?.textContent).toContain('300€');
  });

  it('should render checkbox and label', () => {
    // Arrange
    component.service = mockedSEOService;
    fixture.detectChanges();

    // Assert
    const compiled = fixture.nativeElement as HTMLElement;
    const checkbox = compiled.querySelector('input[type="checkbox"]');
    const label = compiled.querySelector('label');
    expect(checkbox).toBeTruthy();
    expect(label?.textContent).toContain('Add');
  });

  it('should apply selected class when service is selected', () => {
    // Arrange
    component.service = { ...mockedSEOService, selected: true };
    fixture.detectChanges();

    // Assert
    const compiled = fixture.nativeElement as HTMLElement;
    const article = compiled.querySelector('.service-card');
    expect(article?.classList.contains('selected')).toBe(true);
  });

  it('should not apply selected class when service is not selected', () => {
    // Arrange
    component.service = mockedSEOService;
    fixture.detectChanges();

    // Assert
    const compiled = fixture.nativeElement as HTMLElement;
    const article = compiled.querySelector('.service-card');
    expect(article?.classList.contains('selected')).toBe(false);
  });

  it('should not render secondary services when there are not secondary services', () => {
    // Arrange
    component.service = mockedSEOService;
    fixture.detectChanges();

    // Assert
    const compiled = fixture.nativeElement as HTMLElement;
    const secondarySection = compiled.querySelector('.secondary-services');
    expect(secondarySection).toBeFalsy();
  });

  it('should not render secondary services when service is not selected', () => {
    // Arrange
    component.service = mockedWebService;
    fixture.detectChanges();

    // Assert
    const compiled = fixture.nativeElement as HTMLElement;
    const secondarySection = compiled.querySelector('.secondary-services');
    expect(secondarySection).toBeFalsy();
  });

  it('should render secondary services when service is selected and has secondaryServices', () => {
    // Arrange
    component.service = { ...mockedWebService, selected: true };
    fixture.detectChanges();

    // Assert
    const compiled = fixture.nativeElement as HTMLElement;
    const secondaryCards = compiled.querySelectorAll(
      'app-secondary-service-card'
    );
    expect(secondaryCards.length).toBe(2);
  });

  it('should call budgetStateService.manageService when checkbox changes', () => {
    // Arrange
    component.service = mockedSEOService;
    fixture.detectChanges();
    spyOn(component.budgetStateService, 'manageService');

    // Act
    component.onCheckboxChange();

    // Assert
    expect(component.budgetStateService.manageService).toHaveBeenCalledWith({
      title: 'SEO',
      price: 300,
      selected: false,
      secondaryServices: undefined,
    });
  });

  it('should call budgetStateService with correct data for service with secondary services', () => {
    // Arrange
    component.service = mockedWebService;
    fixture.detectChanges();
    spyOn(component.budgetStateService, 'manageService');

    // Act
    component.onCheckboxChange();

    // Assert
    expect(component.budgetStateService.manageService).toHaveBeenCalledWith({
      title: 'Web',
      price: 500,
      selected: false,
      secondaryServices: mockedWebService.secondaryServices,
    });
  });
});
