import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryServiceCardComponent } from './secondary-service-card.component';

describe('SecondaryServiceCardComponent', () => {
  let component: SecondaryServiceCardComponent;
  let fixture: ComponentFixture<SecondaryServiceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondaryServiceCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondaryServiceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
