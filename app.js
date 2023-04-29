let actualPageIndex;

getNextPage();

function getNextPage(){

    if(actualPageIndex === undefined) {
        actualPageIndex = 0;
    } else {
        actualPageIndex++;
    };
    PokeService.getPage(actualPageIndex).then(pokemons => {
        displayPokemon(pokemons);
    });

};

function getPreviousPage(){

    actualPageIndex--;
    PokeService.getPage(actualPageIndex).then(pokemons => {
        displayPokemon(pokemons);
    });

};

function displayPokemon(pokemons) {
    const pokemonBox = document.getElementById('pokemon-box');
    pokemonBox.innerHTML = '';
    for (const pokemon of pokemons) {
        pokemonBox.innerHTML += ` <details>
                                    <summary>
                                        <span>#${numberOfPokedex(pokemon.id)}</span>
                                        <img class="pokemon-img" src="${pokemon.sprites.front_default}" alt="${pokemon.name[0].toUpperCase()+pokemon.name.slice(1)}">
                                        <span>${pokemon.name[0].toUpperCase()+pokemon.name.slice(1)}</span>
                                        <div class="spacer"></div>
                                        ${pokemon.types.map(t => `<span class='type'>${t.type.name[0].toUpperCase()+t.type.name.slice(1)}</span>`).join(' / ')}
                                    </summary>
                                    <div>
                                        <ul>
                                            ${createAbilitiesList(pokemon)}
                                        </ul>
                                    </div>
                                    <p>Questo è Bulbasaur</p>
                                </details>`;
    };
};

function createAbilitiesList(pokemon) {

    let abilitiesHtml = '';
    for (const object of pokemon.abilities) {
        abilitiesHtml += `<li>${object.ability.name[0].toUpperCase()+object.ability.name.slice(1)}</li>`;
    };
    return abilitiesHtml;

};

function numberOfPokedex(pokemonId) {

    let numberOfPokemon;
    if(pokemonId < 10){
        numberOfPokemon = '000' + pokemonId;
    } else if(pokemonId >= 10 && pokemonId < 100) {
        numberOfPokemon = '00' + pokemonId;
    } else if(pokemonId >= 100 && pokemonId < 1000) {
        numberOfPokemon = '0' + pokemonId;
    } else if(pokemonId >= 1000) {
        numberOfPokemon = pokemonId;
    };
    return numberOfPokemon;
    
};