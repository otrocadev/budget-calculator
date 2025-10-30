import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { ServiceCardComponent } from './service-card.component';
import type { Service } from '../../../data/servicesData';

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
    expect(label?.textContent).toContain('Afegir');
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

  it('should emit selectedChange when checkbox changes', () => {
    // Arrange
    component.service = mockedSEOService;
    fixture.detectChanges();
    spyOn(component.selectedChange, 'emit');

    // Act
    component.onCheckboxChange();

    // Assert
    expect(component.selectedChange.emit).toHaveBeenCalledWith({
      service: 'SEO',
      price: 300,
      selected: false,
    });
  });

  it('should calculate total correctly for service without secondary services', () => {
    // Arrange
    component.service = { ...mockedSEOService, selected: true };
    fixture.detectChanges();

    // Act
    component.calculateTotal();

    // Assert
    expect(component.serviceTotal).toBe(300);
  });

  it('should calculate total with secondary services (features and addOns)', () => {
    // Arrange
    const serviceWithSecondary = {
      ...mockedWebService,
      selected: true,
      secondaryServices: [
        {
          title: 'pages',
          type: 'feature' as const,
          price: 30,
          description: 'Pages',
          amount: 2, // 2 pages
        },
        {
          title: 'languages',
          type: 'addOn' as const,
          description: 'Languages',
          amount: 1, // 1 additional language
        },
      ],
    };
    component.service = serviceWithSecondary;
    fixture.detectChanges();

    // Act
    component.calculateTotal();

    // Assert
    // Base: 500
    // Features: 2 pages * 30€ = 60€
    // AddOns multiplier: 1 (default) + 1 (additional) = 2
    // Secondary total: 60 * 2 = 120
    // Total: 500 + 120 = 620
    expect(component.serviceTotal).toBe(620);
  });

  it('should update secondary service amount when secondaryServicesChange is called', () => {
    // Arrange
    component.service = { ...mockedWebService, selected: true };
    fixture.detectChanges();

    // Act
    component.secondaryServicesChange({ service: 'pages', amount: 3 });

    // Assert
    const pagesService = component.service.secondaryServices?.find(
      (s) => s.title === 'pages'
    );
    expect(pagesService?.amount).toBe(3);
  });
});
