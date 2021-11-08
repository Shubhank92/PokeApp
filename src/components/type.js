import React from 'react';
import './card.css';
// import PokeType from './pokeTypeSelect';

function Card ( props ) {
    const {name, data, onTypeSelect} = props;
    const capitalizeName = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    function handleClick() {
        return onTypeSelect(name, data)
    }

    return (
        <div className='tc Color dib br3 pa3 ma2 grow bw2 shadow-5 w-20 typeLi' onClick={handleClick}>
            <div className='typeList'>
                <h2>{capitalizeName(name)}</h2>
            </div>
        </div> 
)
}

export default Card

 // in handleClick pass in data to pokeType