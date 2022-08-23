import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MinhaAreaPage } from './minha-area.page';

describe('MinhaAreaPage', () => {
  let component: MinhaAreaPage;
  let fixture: ComponentFixture<MinhaAreaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinhaAreaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MinhaAreaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
