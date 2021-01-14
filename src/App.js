import React from 'react';
import './App.css';
import SearchBox from './components/searchBox.js';
import CardList from "./components/cardList";
import tachyons from 'tachyons';


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      searchField: '',
      pokemon: []
    }  
  }

  componentDidMount() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
    .then(res => res.json())
    .then(data => {
      return data.results
    })
    .then(data => {
      let SinglePokemonData = data.map((user, i) => {
          const KO = fetch(data[i].url).then(res=> res.json()).then(data => {
            return data
          }).catch(err => console.log("Unable to get data from single pokemon data", err))
          return KO
      })
      Promise.all(SinglePokemonData).then(data => {
        this.setState({pokemon: data})
      }).catch(err => console.log("Couldn't set the single pokemon data to the state array", err))
    })
    .catch(err => console.log("Error", err))
  }

  onSearchChange = (e) => {
    this.setState( { searchField: e.target.value } )
  }

  render() {
    const { pokemon, searchField} = this.state;
    const filteredPoke = pokemon.filter(pok => {
      return pok.name.toLowerCase().includes(searchField);
    })

    return (
      <div className='tc r'>
        <img src='https://fontmeme.com/permalink/201229/34cc001b3b4253ce0d2453c2b4c63937.png' style={{paddingTop: '10px'}}></img>
        <SearchBox searchChange={this.onSearchChange} />
        <CardList data={filteredPoke} />
      </div>
    )
  }
}

export default App



