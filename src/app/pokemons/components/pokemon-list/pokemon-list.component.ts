import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PokemonCardsComponent } from "../pokemon-cards/pokemon-cards.component";
import { SimplePokemon } from '../../interfaces';

@Component({
  selector: 'pokemon-list',
  standalone: true,
  imports: [PokemonCardsComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListComponent {

  public pokemons = input.required<SimplePokemon[]>();
 }
