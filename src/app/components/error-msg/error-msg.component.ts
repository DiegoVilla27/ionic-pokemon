import { NgFor, NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";

export type IErrorMsg = { [key: string]: IValidation[] };

interface IValidation {
  type: string;
  message: string;
}

@Component({
  selector: "poke-error-msg",
  templateUrl: "./error-msg.component.html",
  styleUrls: ["./error-msg.component.scss"],
  standalone: true,
  imports: [NgIf, NgFor]
})
export class ErrorMsgComponent {
  @Input() form!: FormGroup;
  @Input() list!: IValidation[];
  @Input() type!: string;

  hasError(errorType: string): boolean {
    const control = this.findControl(this.form, this.type);
    return Boolean(
      control?.hasError(errorType) && (control.dirty || control.touched)
    );
  }

  private findControl(
    control: AbstractControl,
    path: string
  ): AbstractControl | null {
    const paths = path.split(".");
    let currentControl: AbstractControl | null = control;

    for (const p of paths) {
      if (currentControl instanceof FormGroup) {
        currentControl = currentControl.get(p);
      } else {
        return null;
      }
    }
    return currentControl;
  }
}
