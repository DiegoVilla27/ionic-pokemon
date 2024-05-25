import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { debounceTime } from "rxjs";
import { validations } from "./validations";
import { ErrorMsgComponent } from "src/app/components/error-msg/error-msg.component";
import { NgIf } from "@angular/common";

@Component({
  selector: "poke-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
  imports: [NgIf, FormsModule, ReactiveFormsModule, ErrorMsgComponent],
  standalone: true
})
export class SearchComponent implements OnInit {
  form!: FormGroup;
  @Output() searchFn: EventEmitter<string> = new EventEmitter<string>();

  // ICONS
  ICON_SEARCH: string = "assets/icons/search.svg";

  // VALIDATIONS
  validations = validations;

  constructor(private _fb: FormBuilder) {
    this.buildData();
  }

  ngOnInit(): void {
    this.watchForm();
  }

  buildData(): void {
    this.form = this._fb.group({
      query: ["", Validators.maxLength(50)]
    });
  }

  watchForm(): void {
    this.form
      .get("query")
      ?.valueChanges.pipe(debounceTime(500))
      .subscribe(() => this.submit());
  }

  submit(): void {
    this.form.valid && this.searchFn.emit(this.form.get("query")?.value);
  }
}
