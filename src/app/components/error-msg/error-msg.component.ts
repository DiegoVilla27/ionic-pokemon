import { NgFor, NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "poke-error-msg",
  templateUrl: "./error-msg.component.html",
  styleUrls: ["./error-msg.component.scss"],
  standalone: true,
  imports: [NgIf, NgFor]
})
export class ErrorMsgComponent {
  @Input() form!: FormGroup;
  @Input() list!: { type: string; message: string }[];
  @Input() type!: string;
}
