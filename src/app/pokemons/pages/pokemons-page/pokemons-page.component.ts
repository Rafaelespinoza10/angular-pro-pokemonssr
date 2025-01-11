import { ApplicationRef, ChangeDetectionStrategy, Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../components/pokemon-list/pokemon-list.component";
import { PokemonListSckeletonComponent } from "../pokemon-list-sckeleton/pokemon-list-sckeleton.component";
import { PokemonsService } from '../../services/pokemons.service';
import { SimplePokemon } from '../../interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, of, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemons-page',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSckeletonComponent, RouterLink],
  templateUrl: './pokemons-page.component.html',
  styleUrl: './pokemons-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements  OnDestroy{

  public isLoadingPokemons = signal(true);

  // private appRef = inject(ApplicationRef);
  // private $appState = this.appRef.isStable.subscribe( isStable => {
  //   console.log(isStable);
  // });

  private title = inject(Title);
  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);
  private route = inject(ActivatedRoute);
  private router = inject(Router);


  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map((params) => params['page'] ?? '1'),
      map(page => (isNaN(+page) ? 1 : +page)),
      map(page => Math.max(1, page))
    )
  );  //emitir un observable a signal


  public loadOnChanged = effect(()=> {
    this.loadPokemons ( this.currentPage() );
  }, { allowSignalWrites: true });

  // ngOnInit(): void {
  //   // this.route.queryParamMap.subscribe(console.log);
  //   console.log(this.currentPage());

  //   this.loadPokemons();
  //   //title
  //   //metaTags
  //   //Stable
  //     // setTimeout(() => {
  //     //   this.isLoadingPokemons.set(true);
  //     // }, 5000);

  // }

  ngOnDestroy(): void {
      console.log('destroy');
      // this.$appState.unsubscribe();
  }

  loadPokemons( page = 0){
    const pageToLoad = this.currentPage()! + page;

    this.pokemonsService
    .loadPage(pageToLoad)
    .pipe(
      // tap(
      //   () => this.router.navigate([], { queryParams: {page: pageToLoad }}) ),
      tap(
        () => this.title.setTitle(`Pokemons SSR - Page ${pageToLoad} `)
      )
    )
    .subscribe(pokemons =>{
      this.pokemons.set(pokemons);
    });
  }

 }
