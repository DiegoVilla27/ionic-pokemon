import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { ErrorMsgComponent } from "./error-msg.component";
import { FormControl, FormGroup, Validators } from "@angular/forms";

describe("ErrorMsgComponent", () => {
  let component: ErrorMsgComponent;
  let fixture: ComponentFixture<ErrorMsgComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), ErrorMsgComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMsgComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      query: new FormControl("", Validators.maxLength(50))
    });
    component.list = [
      {
        type: "maxlength",
        message: "Search cannot contain more than 50 characters"
      }
    ];
    component.type = "query";
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
