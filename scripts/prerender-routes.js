
const TOTAL_POKEMONS = 15;
const TOTAL_PAGES = 5;


( async ()=> {

  const fs = require('fs');

  try {

    const pokemonsId = Array.from({ length: TOTAL_PAGES }, (_, i)=> i + 1 );
    const pokemonsArray = pokemonsId.map((id) => `/pokemons/pages/${id}`);

    const response = await fetch( `https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`)
    const { results } = await response.json();
    console.log(results);
    let pokemonsPagesArray = [];

    results.forEach((result, index) => {
      const pokemonPagesAux = `/pokemon/${result.name}`
      pokemonsPagesArray[index] = pokemonPagesAux;
    });

    console.log(pokemonsPagesArray);
    console.log(pokemonsArray);
    const totalRoutes = [...pokemonsArray, ...pokemonsPagesArray];

    const fileContentPages = totalRoutes.map(i => i).join('\n');
    console.log(fileContentPages);
    fs.writeFileSync('routes.txt', fileContentPages);
    console.log('Routes generated Succesfully');


  } catch (error) {
    console.log(error);
  }


})();
