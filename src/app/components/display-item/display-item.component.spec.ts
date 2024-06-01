import { NgClass, NgFor, NgIf, NgStyle } from "@angular/common";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import {
  IonContent,
  IonHeader,
  IonModal,
  IonToolbar
} from "@ionic/angular/standalone";
import { IPokemon } from "src/app/interfaces/pokemon.interface";
import { ColorBackgroundPipe } from "src/app/pipes/color-background.pipe";
import { ColorTypePipe } from "src/app/pipes/color-type.pipe";
import { GradientBackgroundPipe } from "src/app/pipes/gradient-background.pipe";
import { IconTypePipe } from "src/app/pipes/icon-type.pipe";
import { NameStatsPipe } from "src/app/pipes/name-stats.pipe";
import { PercentageStatsPipe } from "src/app/pipes/percentage-stats.pipe";
import { PokemonService } from "src/app/services/pokemon/pokemon.service";
import { DisplayItemComponent } from "./display-item.component";

const pokemon: IPokemon = {
  "name": "bulbasaur",
  "url": "https://pokeapi.co/api/v2/pokemon-species/1/",
  "evolution_url": "https://pokeapi.co/api/v2/evolution-chain/1/",
  "evolutions": ["bulbasaur", "ivysaur", "venusaur"],
  "evolution_data": [
    {
      "height": 7,
      "id": 1,
      "name": "bulbasaur",
      "sprites": {
        "other": {
          "home": {
            "front_default":
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png"
          }
        }
      },
      "stats": [
        {
          "base_stat": 45,
          "stat": {
            "name": "hp",
            "url": "https://pokeapi.co/api/v2/stat/1/"
          }
        }
      ],
      "types": [
        {
          "type": {
            "name": "grass",
            "url": "https://pokeapi.co/api/v2/type/12/"
          }
        }
      ],
      "weight": 69
    }
  ],
  "info": {
    "height": 7,
    "id": 1,
    "name": "bulbasaur",
    "sprites": {
      "other": {
        "home": {
          "front_default":
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png"
        }
      }
    },
    "stats": [
      {
        "base_stat": 45,
        "stat": {
          "name": "hp",
          "url": "https://pokeapi.co/api/v2/stat/1/"
        }
      }
    ],
    "types": [
      {
        "type": {
          "name": "grass",
          "url": "https://pokeapi.co/api/v2/type/12/"
        }
      }
    ],
    "weight": 69
  },
  "color": [120, 200, 180]
};

describe("DisplayItemComponent", () => {
  let component: DisplayItemComponent;
  let fixture: ComponentFixture<DisplayItemComponent>;
  let spyPokemonService: jasmine.SpyObj<PokemonService>;

  beforeEach(waitForAsync(() => {
    spyPokemonService = jasmine.createSpyObj("PokemonService", {
      "setPokemonSelected": () => {}
    });
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
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
        PercentageStatsPipe,
        DisplayItemComponent
      ],
      providers: [
        {
          provide: PokemonService,
          useValue: spyPokemonService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayItemComponent);
    component = fixture.componentInstance;
    component.pokemon = pokemon;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
