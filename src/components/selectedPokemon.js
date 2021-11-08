import React from 'react';
import tachyons from 'tachyons';
import './selectedPokemon.css';


const abilitiesData = (data) => {
    return data.map((user, i) => {
        const name = user.ability.name.replace(/-/g, ' ');
        return <li>{capitalizeName(name)}</li>
    })
}

const statsData = (data) => {
    return data.map((user, i) => {
        const name = capitalizeName(user.stat.name.replace(/-/g, ' '));
        const value = user.base_stat;
        return <li key={i}>{name}: {value}</li>
    })
}

const typeData = (data) => {
    return data.map((user, i) => {
        const name = user.type.name;
        return <li>{capitalizeName(name)}</li>
    })
}

const capitalizeName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function SelectedPokemon({data}) { 
    const {id, abilities, weight, base_experience, stats, types, species} = data;

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
    return (
        <div className="w-75 marAuto">
            <div className="flex items-center h-75 mt3 entireContentDiv" >
                <div className="w-25 pa3 h5 m3 mt3 self-start imgDiv">
                    <img src={imageURL} className="imgBorder" alt={data.species.name} />
                </div>
                <div className="w-75 pa3 mr2 h-100 tl mediaContent">
                    <div className="w-100 mr3">
                        <h1>{species.name.toUpperCase()}</h1>
                    </div>
                    <div className="flex flex-wrap space mediaConBox">
                            <div className="w-25 h-50 pa2 ma2 attriBorder flex justify-center items-center infoColor">
                                <p>Experience: {base_experience}</p>
                            </div>
                            <div className="w-25 h-50 pa2 ma2 attriBorder flex justify-center items-center infoColor">
                                <p>Weight: {weight}</p>
                            </div>
                            <div className="w-25 h-50 pa2 ma2 attriBorder flex justify-center items-center infoColor">
                                    <p>Abilities: {abilitiesData(abilities)}</p>
                            </div>
                            <div className="w-25 h-50 pa2 ma2 attriBorder flex justify-center items-center infoColor">
                                <p>Types: {typeData(types)}</p>
                            </div>
                            <div className="w-25 h-50 pa2 ma2 attriBorder flex justify-center items-center infoColor">
                                <p>Stats: {statsData(stats)}</p>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectedPokemon;