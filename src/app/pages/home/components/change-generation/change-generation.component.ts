import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IonFab, IonFabButton } from "@ionic/angular/standalone";

@Component({
  selector: "poke-change-generation",
  templateUrl: "./change-generation.component.html",
  styleUrls: ["./change-generation.component.scss"],
  standalone: true,
  imports: [IonFabButton, IonFab]
})
export class ChangeGenerationComponent {
  @Input() generation: number = 1;
  @Output() changeGenerationFn: EventEmitter<number> =
    new EventEmitter<number>();
  // IMAGES
  IMG_POKEBALL_ULTRA: string = "assets/images/pokeball/great-pokeball.png";
  IMG_POKEBALL: string = "assets/images/pokeball/pokeball.png";

  changeGeneration(generation: number): void {
    if (generation === 1) this.changeGenerationFn.emit(2);
    else this.changeGenerationFn.emit(1);
  }
}
