import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { TPlatform } from "src/app/interfaces/general.interface";

@Injectable({
  providedIn: "root"
})
export class PlatformService {
  // OBS
  platform$: BehaviorSubject<TPlatform> = new BehaviorSubject<TPlatform>(
    "android"
  );

  constructor() {}

  getPlatform(): Observable<TPlatform> {
    return this.platform$.asObservable();
  }

  setPlatform(platform: TPlatform): void {
    this.platform$.next(platform);
  }
}
