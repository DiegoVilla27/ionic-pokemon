import { HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";
import { IonApp, IonRouterOutlet } from "@ionic/angular/standalone";
import { PokemonService } from "./services/pokemon.service";

@Component({
  selector: "poke-root",
  templateUrl: "app.component.html",
  standalone: true,
  imports: [HttpClientModule, IonApp, IonRouterOutlet],
  providers: [PokemonService]
})
export class AppComponent {
  constructor() {}
}
