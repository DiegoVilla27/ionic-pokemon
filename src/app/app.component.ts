import { HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";
import { StatusBar } from "@capacitor/status-bar";
import { Platform } from "@ionic/angular";
import { IonApp, IonRouterOutlet } from "@ionic/angular/standalone";
import { PlatformService } from "./services/platform/platform.service";
import { PokemonService } from "./services/pokemon/pokemon.service";
/* eslint-disable no-var */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare var window: any;

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
    this.initializeApp();
    this.getPlatform();
    this.setStatusBar();
  }

  initializeApp(): void {
    this._platform.ready().then(() => {
      this.fixSafeAreaAndroidNotch();
    });
  }

  fixSafeAreaAndroidNotch(): void {
    // This method needed cordova-plugin-android-notch library to work
    if (window.AndroidNotch) {
      const style = document.documentElement.style;
      window.AndroidNotch.getInsetTop((px: number) => {
        style.setProperty("--ion-safe-area-top", px + "px");
      });
    }
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
