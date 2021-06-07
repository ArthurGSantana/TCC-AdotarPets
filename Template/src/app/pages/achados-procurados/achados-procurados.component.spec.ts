import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchadosProcuradosComponent } from './achados-procurados.component';

describe('AchadosProcuradosComponent', () => {
  let component: AchadosProcuradosComponent;
  let fixture: ComponentFixture<AchadosProcuradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AchadosProcuradosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AchadosProcuradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
