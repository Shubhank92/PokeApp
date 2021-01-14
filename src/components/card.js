import React from 'react';
import './card.css';
import tachyons from 'tachyons';

function Card ( props ) {
    const {name, id, data, type} = props;
    const imageURL = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const capitalizeName = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
      
    return (
        <div className='tc Color dib br3 pa3 ma2 grow bw2 shadow-5'>
            <img src={imageURL} alt={name} width='200px' height='200px' />
            <div>
                <h2>{capitalizeName(name)}</h2>
                <h3>Type: {capitalizeName(type)}</h3>
            </div>
        </div> 
)
}

export default Card

