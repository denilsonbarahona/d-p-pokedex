import { getPokemon, getSpecies } from './api.js';
import createChart from './chart.js';

const $pokedex = document.querySelector("#pokedex");
const $screen = document.querySelector("#screen");
const $speaker = document.querySelector("#speaker");
let chart = null;
let LABELS = [];
let BASES = [];

function loader(isLoading = false){
    const img = isLoading?'url(./images/loading.gif)':'';
    $screen.style.backgroundImage = img;
}

function AnimateSpeaker(){
    $speaker.classList.toggle("is-animated"); 
}

function setStates(stats){
   LABELS = [];
   BASES = [];
   LABELS.push( ...stats.map(item=>item.stat.name.split("-")) );
   BASES.push( ...stats.map(item=>item.base_stat));
}


const $image = document.querySelector("#image");
export function setImage(img) {
    $image.src = img;
}

const $description = document.querySelector("#description");
function setDescription(description) {
    $description.textContent = description;
}

async function findPokemon(id){
    const pokemon = await getPokemon(id);    
    const species = await getSpecies(id);
    const stats = pokemon.stats;
    setStates(stats) 
    const sprites = [pokemon.sprites?.front_default];

    for(const item in pokemon.sprites){
        if(!["front_default", "other","versions"].includes(item) && pokemon.sprites[item]) {
            sprites.push(pokemon.sprites[item]);
        }
    }

    let description=null;
    if(pokemon.result)
        description = species.flavor_text_entries.find((flavor)=>flavor.language.name==="es");
    return {
        description: description?.flavor_text,
        sprites,
        result: pokemon.result,
        name: pokemon.name,
    }
}

function speech(text){
    if(speechSynthesis.speaking || speechSynthesis.pending)
        speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang ="es";
    AnimateSpeaker();
    speechSynthesis.speak(utterance);
    
    utterance.addEventListener("end",()=>{
        AnimateSpeaker();
    })
}

export async function setPokemon(id){
    loader(true);
    const pokemon = await findPokemon(id);
    loader(false);
    setImage(pokemon.result?pokemon.sprites[0]:"");
    const description = pokemon.result?pokemon.description:"pokémon no encontrado";
    setDescription(description);
    speech(`${pokemon.name}. ${description}`)
    $pokedex.classList.add("is-open")
    if(chart instanceof Chart) 
        chart.destroy();

    chart = createChart(LABELS, BASES);
    return pokemon;
}
