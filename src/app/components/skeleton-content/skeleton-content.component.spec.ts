import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SkeletonContentComponent } from "./skeleton-content.component";

describe("SkeletonContentComponent", () => {
  let component: SkeletonContentComponent;
  let fixture: ComponentFixture<SkeletonContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonContentComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
