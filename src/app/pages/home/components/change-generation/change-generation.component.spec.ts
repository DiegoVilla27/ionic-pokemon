import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { ChangeGenerationComponent } from "./change-generation.component";

describe("ChangeGenerationComponent", () => {
  let component: ChangeGenerationComponent;
  let fixture: ComponentFixture<ChangeGenerationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), ChangeGenerationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeGenerationComponent);
    component = fixture.componentInstance;
    component.generation = 1;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
