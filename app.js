let actualPageIndex = -1;

getNextPage();

function getNextPage(){

    actualPageIndex++;
    if(actualPageIndex === undefined || actualPageIndex >= PokeService.PAGE_COUNT) {
        actualPageIndex = 0;
    };
    PokeService.getPage(actualPageIndex).then(pokemons => {
        displayPokemon(pokemons);
    });

};

function getPreviousPage(){

    actualPageIndex--;
    if (actualPageIndex < 0) {
        actualPageIndex = PokeService.PAGE_COUNT - 1;
    };
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
                                        <span><strong>#${numberOfPokedex(pokemon.id)}</strong></span>
                                        <img class="pokemon-img" src="${pokemon.sprites.front_default}" alt="${pokemon.name[0].toUpperCase()+pokemon.name.slice(1)}">
                                        <span><strong>${pokemon.name[0].toUpperCase()+pokemon.name.slice(1)}</strong></span>
                                        <div class="spacer"></div>
                                        ${pokemon.types.map(t => `<span class='type'><strong>${t.type.name[0].toUpperCase()+t.type.name.slice(1)}</strong></span>`).join(' / ')}
                                    </summary>
                                    <div>
                                        <strong>Abilities:</strong>
                                        <ul>
                                            ${createAbilitiesList(pokemon)}
                                        </ul>
                                    </div>
                                    <div>
                                    <strong>Stats:</strong>
                                        <ul>
                                            ${createStatsList(pokemon)}
                                        </ul>
                                    </div>
                                    <span><strong>Base Experience: </strong>${pokemon.base_experience}</span>
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

function createStatsList(pokemon) {

    let statsHtml = '';
    let pokeStats = pokemon.stats;
    for (const object of pokeStats) {
        statsHtml += `<li>${object.stat.name[0].toUpperCase()+object.stat.name.slice(1)}: ${object.base_stat}</li>`;
    };
    return statsHtml;

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