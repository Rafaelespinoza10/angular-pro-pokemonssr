import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PokemonCardsComponent } from "../../components/pokemon-cards/pokemon-cards.component";
import { SimplePokemon } from '../../interfaces';

@Component({
  selector: 'pokemon-list-sckeleton',
  standalone: true,
  imports: [PokemonCardsComponent],
  templateUrl: './pokemon-list-sckeleton.component.html',
  styleUrl: './pokemon-list-sckeleton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListSckeletonComponent {

  // public pokemons = input.required<SimplePokemon[]>();

}
