import React from 'react';
import './card.css';
import tachyons from 'tachyons';

function Card ( props ) {
    const {name, id, type, onPokemonSelect, data } = props;
    let imageURL;
    let url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    
    if (id < 10) {
        imageURL = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${id}.png`;
    } else if (9 < id && id < 100) {
        imageURL = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0${id}.png`;
    } else if (99 < id && id < 1000) {
        imageURL = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`;
    } else {
        return null
    }
    const capitalizeName = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
      
    return (
        <div className='tc Color dib br3 pa3 ma2 grow bw2 shadow-5' onClick={() => onPokemonSelect(url)}>
            <img src={imageURL} alt={name} width='200px' height='200px' />
            <div>
                <h2>{capitalizeName(name)}</h2>
                <h3>Type: {capitalizeName(type)}</h3>
            </div>
        </div> 
)
}

export default Card

