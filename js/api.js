const POKEBASE='https://pokeapi.co/api/v2/';

async function getPokemon(id){
    var response = { result:true};
    try{
        const pokemon = await fetch(`${POKEBASE}pokemon/${id}`);
        const data = await pokemon.json();      
        response = {...response, ...data};
    }catch(e){
        response = {result: false, name:""};
    }
    return response;
}

async function getSpecies(id){
    var response = { result:true};
    try{
        const pokemon = await fetch(`${POKEBASE}pokemon-species/${id}`);
        const data = await pokemon.json();      
        response = {...response, ...data};
    }catch(e){
        response = {result: false};
    }
    return response;
}

export {
    getPokemon,
    getSpecies
}