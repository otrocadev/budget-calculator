import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetInfoCardComponent } from './budget-info-card.component';

describe('BudgetInfoCardComponent', () => {
  let component: BudgetInfoCardComponent;
  let fixture: ComponentFixture<BudgetInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetInfoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
