import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesMaquinaComponent } from './detalhes-maquina.component';

describe('DetalhesMaquinaComponent', () => {
  let component: DetalhesMaquinaComponent;
  let fixture: ComponentFixture<DetalhesMaquinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesMaquinaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesMaquinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
