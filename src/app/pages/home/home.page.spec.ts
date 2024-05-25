import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HomePage } from "./home.page";
import { PokemonService } from "src/app/services/pokemon.service";
import { of } from "rxjs";

describe("HomePage", () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let spyPokemonService: jasmine.SpyObj<PokemonService>;

  beforeEach(async () => {
    spyPokemonService = jasmine.createSpyObj("PokemonService", {
      "getPokemons": of([]),
      "getPokemonSelected": of(null)
    });

    TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        {
          provide: PokemonService,
          useValue: spyPokemonService
        }
      ]
    });
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
