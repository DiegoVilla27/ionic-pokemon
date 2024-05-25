import { Component } from "@angular/core";
import { SkeletonContentComponent } from "src/app/components/skeleton-content/skeleton-content.component";

@Component({
  selector: "poke-skeleton",
  standalone: true,
  imports: [SkeletonContentComponent],
  templateUrl: "./skeleton.component.html",
  styleUrl: "./skeleton.component.scss"
})
export class SkeletonComponent {}
