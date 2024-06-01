import { HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";
import { IonApp, IonRouterOutlet } from "@ionic/angular/standalone";
import { PokemonService } from "./services/pokemon/pokemon.service";
import { PlatformService } from "./services/platform/platform.service";
import { Platform } from "@ionic/angular";
import { StatusBar } from "@capacitor/status-bar";

@Component({
  selector: "poke-root",
  templateUrl: "app.component.html",
  standalone: true,
  imports: [HttpClientModule, IonApp, IonRouterOutlet],
  providers: [PokemonService]
})
export class AppComponent {
  constructor(
    private _platform: Platform,
    private _platformSvc: PlatformService
  ) {
    this.getPlatform();
    this.setStatusBar();
  }

  getPlatform(): void {
    // Get the platform
    const isIOS = this._platform.is("ios");
    this._platformSvc.setPlatform(isIOS ? "ios" : "android");
  }

  setStatusBar() {
    // Overlay status bar (Android only)
    StatusBar.setOverlaysWebView({ overlay: true });
  }
}
