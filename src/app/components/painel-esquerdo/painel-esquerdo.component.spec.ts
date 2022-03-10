import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelEsquerdoComponent } from './painel-esquerdo.component';

describe('PainelEsquerdoComponent', () => {
  let component: PainelEsquerdoComponent;
  let fixture: ComponentFixture<PainelEsquerdoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PainelEsquerdoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelEsquerdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
