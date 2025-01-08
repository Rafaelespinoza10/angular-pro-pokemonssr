import { ChangeDetectionStrategy, Component, computed, effect, input } from '@angular/core';
import { SimplePokemon } from '../../interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pokemon-cards',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pokemon-cards.component.html',
  styleUrl: './pokemon-cards.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardsComponent {

  public pokemon = input.required<SimplePokemon>();
  public readonly pokemonImage = computed(
    ()=>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
      this.pokemon().id
    }.png`
  )

  //logEffect
  // logEffect = effect(()=> {
  //   console.log(this.pokemon());
  // })

}
