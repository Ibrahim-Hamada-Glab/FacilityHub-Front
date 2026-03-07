import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitiyRow } from './facilitiy-row';

describe('FacilitiyRow', () => {
  let component: FacilitiyRow;
  let fixture: ComponentFixture<FacilitiyRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilitiyRow],
    }).compileComponents();

    fixture = TestBed.createComponent(FacilitiyRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
