import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { ListComponent } from "./list.component";
import { PokemonService } from "src/app/services/pokemon.service";
import { IPokemon } from "src/app/interfaces/pokemon.interface";

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

describe("ListComponent", () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let spyPokemonService: jasmine.SpyObj<PokemonService>;

  beforeEach(waitForAsync(() => {
    spyPokemonService = jasmine.createSpyObj("PokemonService", {
      "setPokemonSelected": () => {}
    });
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), ListComponent],
      providers: [
        {
          provide: PokemonService,
          useValue: spyPokemonService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    component.pokemons = [pokemon];
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
