import "./chart.js";
import {setPokemon, setImage} from './pokedex.js';

let activeId = 0;
let pokemon = null;
let activeImage = 0;

const $form   = document.querySelector("#form");
const $next   = document.querySelector("#next-pokemon");
const $prev   = document.querySelector("#prev-pokemon");
const $input  = document.querySelector("#input");
const $ramdom = document.querySelector("#ramdom");
const $nextImg= document.querySelector("#next-img");
const $prevImg= document.querySelector("#prev-img");

$form.addEventListener("submit", HandleSumitForm);
async function HandleSumitForm(e){
    e.preventDefault();
    const data = new FormData($form);
    const parsed = parseInt(data.get("id"));
    activeId = isNaN(parsed)?0:parsed;
    pokemon = await setPokemon(activeId);
}

$next.addEventListener("click", HandleClickNext);
async function HandleClickNext(){
    activeId = (activeId >= 898)?1:(activeId+1);
    setActiveNumber(activeId);
    pokemon = await setPokemon(activeId);
}

$prev.addEventListener("click", HandleClickPrev);
async function HandleClickPrev(){
    activeId = (activeId <=1)?898:(activeId-1);
    setActiveNumber(activeId);
    pokemon = await setPokemon(activeId);
}

$ramdom.addEventListener("click", HandleClickRamdom);
async function HandleClickRamdom(){
    activeId = getRamdon();
    setActiveNumber(activeId);
    pokemon = await setPokemon(activeId);
}

$nextImg.addEventListener("click",HandleClickNextImage);
function HandleClickNextImage(){
    if(activeId <=0 || activeId>=898) return false;
    activeImage= activeImage+1;
    const image = getImageURL(); 
    setImage(image);
}

$prevImg.addEventListener("click",HandleClickPrevImage);
function HandleClickPrevImage(){
    if(activeId <=0 || activeId>=898) return false;
    activeImage-=1;
    const image = getImageURL();
    setImage(image);
}


function setActiveNumber(active){
    $input.value = active;
}

function getRamdon(){
    return Math.floor(Math.random() * 898 + 1);
}

const getImageURL=()=>{
    const sprites = pokemon.sprites;

    if(activeImage >= sprites.length) {
        activeImage = 0; 
    }

    if(activeImage < 0) {
        activeImage = sprites.length -1;
    }
    return sprites[activeImage];
}