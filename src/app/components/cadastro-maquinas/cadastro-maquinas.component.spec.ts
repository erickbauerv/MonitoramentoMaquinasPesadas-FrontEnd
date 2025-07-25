import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroMaquinasComponent } from './cadastro-maquinas.component';

describe('CadastroMaquinasComponent', () => {
  let component: CadastroMaquinasComponent;
  let fixture: ComponentFixture<CadastroMaquinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroMaquinasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroMaquinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
