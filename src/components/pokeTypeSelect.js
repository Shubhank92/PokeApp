import React from 'react';
import './card.css'
//extracting id from url
function extractId(str) {
    let matches = str.match(/\d+/g);
    return matches[1];
}


function Card ( props ) {
    const {name, id, url, onPokemonSelect} = props;
    let imageURL;
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
        <div className='tc Color dib br3 pa3 ma2 grow bw2 shadow-5 singlePok' onClick={() => onPokemonSelect(url)}>
            <img src={imageURL} alt={name} />
            <div>
                <h2 className="tc">{capitalizeName(name)}</h2>
            </div>
        </div> 
)
}
 
function CardList ( {data, onPokemonSelect} ) {
    return (
        <div>
            {
                data.map((user, i) => {
                    return (
                        <Card
                            name={data[i].pokemon.name}
                            id={extractId(data[i].pokemon.url)}
                            url={data[i].pokemon.url}
                            onPokemonSelect={onPokemonSelect}
                        />
                    )
                })
            }
        </div>
    )
}

function PokeType({ data,onPokemonSelect }) {
        return (
            <div>{<CardList data={data} onPokemonSelect={onPokemonSelect} />}</div>
        )
}

export default PokeType