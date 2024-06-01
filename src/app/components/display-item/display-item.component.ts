import { NgClass, NgFor, NgIf, NgStyle } from "@angular/common";
import { Component, Input, OnDestroy } from "@angular/core";
import {
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import { Subject, takeUntil } from "rxjs";
import { TPlatform } from "src/app/interfaces/general.interface";
import { IPokemon } from "src/app/interfaces/pokemon.interface";
import { ColorBackgroundPipe } from "src/app/pipes/color-background.pipe";
import { ColorTypePipe } from "src/app/pipes/color-type.pipe";
import { GradientBackgroundPipe } from "src/app/pipes/gradient-background.pipe";
import { IconTypePipe } from "src/app/pipes/icon-type.pipe";
import { NameStatsPipe } from "src/app/pipes/name-stats.pipe";
import { PercentageStatsPipe } from "src/app/pipes/percentage-stats.pipe";
import { PlatformService } from "src/app/services/platform/platform.service";
import { PokemonService } from "src/app/services/pokemon/pokemon.service";

@Component({
  selector: "poke-display-item",
  templateUrl: "./display-item.component.html",
  styleUrls: ["./display-item.component.scss"],
  standalone: true,
  imports: [
    IonTitle,
    NgStyle,
    NgClass,
    NgIf,
    NgFor,
    IonModal,
    IonContent,
    IonHeader,
    IonToolbar,
    ColorTypePipe,
    IconTypePipe,
    GradientBackgroundPipe,
    ColorBackgroundPipe,
    NameStatsPipe,
    PercentageStatsPipe
  ]
})
export class DisplayItemComponent implements OnDestroy {
  @Input() pokemon!: IPokemon | null;
  platform: TPlatform = "android";
  ICON_CLOSE: string = "assets/icons/arrow-left.svg";

  // OBS
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _pokemonSvc: PokemonService,
    private _platformSvc: PlatformService
  ) {
    this._platformSvc
      .getPlatform()
      .pipe(takeUntil(this.destroy$))
      .subscribe((platform: TPlatform) => (this.platform = platform));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  close(): void {
    this._pokemonSvc.setPokemonSelected(null);
    this.pokemon = null;
  }
}
