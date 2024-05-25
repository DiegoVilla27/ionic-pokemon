import { Component, Input } from "@angular/core";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";

@Component({
  selector: "poke-skeleton-content",
  standalone: true,
  imports: [NgxSkeletonLoaderModule],
  templateUrl: "./skeleton-content.component.html",
  styleUrl: "./skeleton-content.component.scss"
})
export class SkeletonContentComponent {
  @Input() size: number = 1;
  @Input() width: string = "100px";
  @Input() height: string = "100px";
  @Input() type: "" | "circle" | "custom-content" | "line" = "line";
}
