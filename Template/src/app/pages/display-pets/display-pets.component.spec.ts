import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPetsComponent } from './display-pets.component';

describe('DisplayPetsComponent', () => {
  let component: DisplayPetsComponent;
  let fixture: ComponentFixture<DisplayPetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayPetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
