import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMaquinasComponent } from './dashboard-maquinas.component';

describe('DashboardMaquinasComponent', () => {
  let component: DashboardMaquinasComponent;
  let fixture: ComponentFixture<DashboardMaquinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMaquinasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardMaquinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
