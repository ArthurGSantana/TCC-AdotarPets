import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarPetComponent } from './adicionar-pet.component';

describe('AdicionarPetComponent', () => {
  let component: AdicionarPetComponent;
  let fixture: ComponentFixture<AdicionarPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarPetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
