import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitiyCard } from './facilitiy-card';

describe('FacilitiyCard', () => {
  let component: FacilitiyCard;
  let fixture: ComponentFixture<FacilitiyCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilitiyCard],
    }).compileComponents();

    fixture = TestBed.createComponent(FacilitiyCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
