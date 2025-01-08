import { PokemonsService } from './../../services/pokemons.service';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../interfaces';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon-page',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-page.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit{

  private PokemonsService = inject(PokemonsService);
  private title  = inject(Title);
  private meta = inject(Meta);
  private route = inject(ActivatedRoute);
  public pokemon = signal<Pokemon | null>(null);


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if(!id) return;

    this.PokemonsService.loadPokemon(id)
      .pipe(
        tap( ({ name, id}) => {
          const pageTitle = `#${ id } - ${ name }`;
            this.title.setTitle( pageTitle );
            this.meta.updateTag( { name: 'description', content: `Pagina del pokemon ${ name }` });
            this.meta.updateTag({ name: 'og:title', content: pageTitle });
            this.meta.updateTag( { name: 'og:description', content: `Pagina del pokemon ${ name }` });
            this.meta.updateTag( { name: 'og:image', content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`});


        }),
      )
    .subscribe(this.pokemon.set);

  }


}
