import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegulamentoPage } from './regulamento.page';

describe('RegulamentoPage', () => {
  let component: RegulamentoPage;
  let fixture: ComponentFixture<RegulamentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegulamentoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegulamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
