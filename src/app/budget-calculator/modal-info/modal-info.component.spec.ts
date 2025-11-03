import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ModalInfoComponent } from './modal-info.component';

describe('ModalInfoComponent', () => {
  let component: ModalInfoComponent;
  let fixture: ComponentFixture<ModalInfoComponent>;

  // Mock data for testing
  const mockDataWithPrice = {
    title: 'pages',
    description: 'Add the pages that your website will have',
    price: 30,
  };

  const mockDataWithoutPrice = {
    title: 'languages',
    description: 'Choose the languages for your website',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalInfoComponent],
      providers: [
        {
          provide: DIALOG_DATA,
          useValue: mockDataWithPrice,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject and access dialog data', () => {
    expect(component.data).toEqual(mockDataWithPrice);
    expect(component.title).toBe('pages');
    expect(component.description).toBe(
      'Add the pages that your website will have'
    );
    expect(component.price).toBe(30);
  });

  it('should render title in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('h2');
    expect(titleElement?.textContent).toContain('Number of pages');
  });

  it('should render description in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const paragraphs = compiled.querySelectorAll('p');
    expect(paragraphs[0]?.textContent).toContain(
      'Add the pages that your website will have'
    );
  });

  it('should render price when provided', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const paragraphs = compiled.querySelectorAll('p');
    expect(paragraphs[1]?.textContent).toContain(
      'Each of the pages has a cost of 30€'
    );
  });

  it('should not render price section when price is not provided', () => {
    // Recreate component with data without price
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ModalInfoComponent],
      providers: [
        {
          provide: DIALOG_DATA,
          useValue: mockDataWithoutPrice,
        },
      ],
    });

    const newFixture = TestBed.createComponent(ModalInfoComponent);
    newFixture.detectChanges();

    const compiled = newFixture.nativeElement as HTMLElement;
    const paragraphs = compiled.querySelectorAll('p');
    // Should only have 1 paragraph (description), not 2
    expect(paragraphs.length).toBe(1);
    expect(paragraphs[0]?.textContent).toContain(
      'Choose the languages for your website'
    );
  });
});
