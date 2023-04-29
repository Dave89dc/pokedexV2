class PokeService{

    static BASE_URL = 'https://pokeapi.co/api/v2/';
    static PAGE_LIMIT = 9;
    static POKEMON_NUMBER = 1281;
    static PAGE_COUNT = Math.ceil(this.POKEMON_NUMBER / this.PAGE_LIMIT)

    static getPage(index) {
        const url = this.BASE_URL + 'pokemon?limit=' 
                                  + this.PAGE_LIMIT 
                                  + '&offset=' 
                                  + (this.PAGE_LIMIT * index);
        return fetch(url)
            .then(resp => resp.json())
            .then(pokemonPage => this.getDetails(pokemonPage.results));
    };

    static getDetails(pokemonNames) {
        const requests = [];
        for (const pokemon of pokemonNames) {
            const name = pokemon.name;
            const url = this.BASE_URL + 'pokemon/' + name;
            const request = fetch(url).then(resp => resp.json());
            requests.push(request);
        };
        return Promise.all(requests);
    };

};