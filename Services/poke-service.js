class PokeService{

    static PAGE_COUNT = 20;
    static BASE_URL = 'https://pokeapi.co/api/v2/';

    static getPage(index) {
        const url = this.BASE_URL + '/pokemon?limit=' 
                                  + this.PAGE_COUNT 
                                  + '&offset=' 
                                  + (this.PAGE_COUNT * index);
        return fetch(url)
            .then(resp => resp.json())
            .then(pokemonPage => this.getDetails(pokemonPage.results));
    };

    static getDetails(pokemonNames) {
        const requests = [];
        for (const pokemon of pokemonNames) {
            const name = pokemon.name[0].toUpperCase + pokemon.name.splice(1);
            console.log(name);
        };
    };

};