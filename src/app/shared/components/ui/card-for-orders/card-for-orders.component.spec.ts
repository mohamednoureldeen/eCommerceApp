import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardForOrdersComponent } from './card-for-orders.component';

describe('CardForOrdersComponent', () => {
  let component: CardForOrdersComponent;
  let fixture: ComponentFixture<CardForOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardForOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardForOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
