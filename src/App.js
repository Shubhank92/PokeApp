// CODE LOOKS LIKE THIS BECASUE WE'RE USING A HOOKS

// import React, { useEffect, useState} from 'react';
// import './App.css';
// import SearchBox from './components/searchBox.js';
// import CardList from "./components/cardList";
// import tachyons from 'tachyons';

// function App() {
//   const [searchField, setSearchField] = useState('');
//   const [pokemon, setPokemon] = useState([]);

//   useEffect(() => {
//     fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
//     .then(res => res.json())
//     .then(data => {
//       return data.results
//     }) 
//     .then(data => {
//       let SinglePokemonData = data.map((user, i) => {
//           const KO = fetch(data[i].url).then(res=> res.json()).then(data => {
//             return data
//           }).catch(err => console.log("Unable to get data from single pokemon data", err))
//           return KO
//       })
//       Promise.all(SinglePokemonData).then(data => {
//         setPokemon(data)
//       }).catch(err => console.log("Couldn't set the single pokemon data to the state array", err))
//     })
//     .catch(err => console.log("Error", err))
//   }, [])

//   const onSearchChange = (e) => {
//     setSearchField(e.target.value)
//   }

//   const filteredPoke = pokemon.filter(pok => {
//       return pok.name.toLowerCase().includes(searchField);
//   })

//   if (filteredPoke.length !== 0) {
//     return (
//         <div className='tc r'>
//           <img src='https://fontmeme.com/permalink/201229/34cc001b3b4253ce0d2453c2b4c63937.png' style={{paddingTop: '10px'}}></img>
//           <SearchBox searchChange={onSearchChange} />
//           <CardList data={filteredPoke} />
//         </div>
//     )
//   } else {
//     return (
//       <div className='tc r'>
//         <img src='https://fontmeme.com/permalink/201229/34cc001b3b4253ce0d2453c2b4c63937.png' style={{paddingTop: '10px'}}></img>
//         <SearchBox searchChange={onSearchChange} />
//         <h3>No pokemon found for the following Search. Please try again!</h3>
//       </div>
//   )
//   }

// }

// export default App

// CODE WOULD'VE LOOKED LIKE THIS IF WE WERE USING A CLASS COMPONENT


import React, {Component} from 'react';
import ReactLoading from 'react-loading';
import './App.css';
import SearchBox from './components/searchBox.js';
import TypeList from "./components/typeList";
import CardList from "./components/cardList";
import PokeType from './components/pokeTypeSelect';
import SelectedPokemon from './components/selectedPokemon';

const intitialState = {
  searchField: '',
  pokemonTypes: [],
  pokemon: [],
  singleTypePokemonExamples: [],
  type: '',
  typeUrl: '',
  selectedPokemonDetails: {},
  selectedPokemonUrl: '',
  isLoading: true
}  

let typeId = '';
let pokeId = '';

class App extends Component {
  constructor() {
    super()
    this.state = intitialState
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevState.typeUrl !== this.state.typeUrl){
      this.setState({isLoading: true})
      typeId = this.state.typeUrl.substr(30).replace("/", '').replace("/", '');
        
      fetch(`https://peaceful-wave-37654.herokuapp.com/singleTypePokemons/${typeId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ singleTypePokemonExamples: data.pokemon, isLoading: false});
        return data.pokemon
      })
      .catch(err => {
        console.log("Could not get examples for a particular type of pokemons", err)
      })
    }
    
    if (prevState.selectedPokemonUrl !== this.state.selectedPokemonUrl){
      this.setState({isLoading: true})
      pokeId = this.state.selectedPokemonUrl.substr(33).replace("/", '').replace("/", '');
      
      fetch(`https://peaceful-wave-37654.herokuapp.com/selectedPokemon/${pokeId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ selectedPokemonDetails : data, isLoading: false});
        return data
      })
      .catch(err => {
        console.log("Could not get examples for a particular type of pokemons", err)
      })
    }
  }

  componentDidMount() {

    fetch('https://peaceful-wave-37654.herokuapp.com/type')
    .then(res => res.json())
    .then(data => {
      //here we're setting the state
      this.setState({pokemonTypes: data, isLoading: false});
      return data
    })
    .catch(err => console.log("Error", err));


    fetch('https://peaceful-wave-37654.herokuapp.com/searchBar')
    .then(res => res.json())
    .then(data => {
      this.setState({pokemon: data, isLoading: false})
    })
    .catch(err => console.log("Error", err));    

  }

  onSearchChange = (e) => {
    this.setState( { searchField: e.target.value } )
  }

  onTypeSelect = (name, data) => {
    this.setState( { type: name, typeUrl: data.url } )
  }

  onPokemonSelect = (url) => {
    this.setState( { selectedPokemonUrl: url} );
  }

  returnHome = () => {
    this.setState( { searchField: '', type: '' } )
  }

  render() {
    const { pokemon, searchField, pokemonTypes, type, singleTypePokemonExamples, selectedPokemonUrl, returnHome, isLoading} = this.state;
    const filteredPoke = pokemon.filter(pok => {
      return pok.name.toLowerCase().includes(searchField);
    });
    if (isLoading) {
      return <div className='loading'>
      <ReactLoading type={"bars"} color={"#F88379"} width={'30vw'}/>
      </div>
    } else {
      if (searchField === '') {
        return (
          <div className='tc r'>
            <div onClick={returnHome}>
              <img src='https://fontmeme.com/permalink/201229/34cc001b3b4253ce0d2453c2b4c63937.png' style={{paddingTop: '10px'}} alt=""/>
            </div>  
            { type === '' ?
                <div>
                  <SearchBox searchChange={this.onSearchChange} />
                  <h1>Search for a pokemon through different types</h1>
                  <TypeList data={pokemonTypes} onTypeSelect={this.onTypeSelect}/>
                </div>
                :
                ( 
                  selectedPokemonUrl === '' ?
                    <PokeType type={this.state.type} data={singleTypePokemonExamples} onPokemonSelect={this.onPokemonSelect} />
                    :
                    <SelectedPokemon data={this.state.selectedPokemonDetails}/>
                )                
            }
            <footer>
              <center>
                <p style={{ marginBottom: '0px'}}>This Web App has been created by <a href="https://shubhank-dev.netlify.app/">Shubhank Gaba</a></p>
              </center>
            </footer>
          </div>
        )
      } else {
        return (
          <div className='tc r'>
            <div onClick={returnHome}>
              <img src='https://fontmeme.com/permalink/201229/34cc001b3b4253ce0d2453c2b4c63937.png' style={{paddingTop: '10px'}} alt=""/>
            </div>
            {( 
              selectedPokemonUrl === '' ?  
                <div>
                  <SearchBox searchChange={this.onSearchChange} />
                  <CardList data={filteredPoke} onPokemonSelect={this.onPokemonSelect} />
                </div>          
                :
                <SelectedPokemon data={this.state.selectedPokemonDetails}/>
            )}            
            <footer>
              <center>
                <p style={{ marginBottom: '0px'}}>This Web App has been created by <a href="https://shubhank-dev.netlify.app/">Shubhank Gaba</a></p>
              </center>
            </footer>
          </div>
        )
      }
    }
  }
}
 
export default App