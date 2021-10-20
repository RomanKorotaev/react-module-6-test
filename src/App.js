import React, {Component} from 'react';
import { ToastContainer, toast } from 'react-toastify'; //// npm-пакет react для алертов, которые высвечиваются на протяжении указанного времени


import { FaBeer } from 'react-icons/fa'; // npm-пакет для иконок react

import PokemonInfo from './components/PokemonInfo/PokemonInfo';
import PokemonForm from './components/PokemonForm/PokemonForm';



class App extends Component {

  state = {
    pokemon: {},
    loading: false,

    pokemonName: ""
  }

  handleFormSummit = pokemonName => {
    console.log (pokemonName)
    this.setState ({pokemonName});
  }

   componentDidMount () {
    this.setState ({ loading: true })

    setTimeout (() =>{
    fetch ('https://pokeapi.co/api/v2/pokemon/ditto')
    .then(res=>res.json() )
    .then (pokemon => this.setState ({pokemon}) )
    .finally ( ()=> this.setState ({ loading: true }) )
  }, 1000 );
}


  render() {
   
    

    return (

      <div style = { { maxWidth: 1170, margin: '0 auto', padding: 20 } } >
            {this.state.loading && <h1>  Загружаем ... </h1> }
            {this.state.pokemon && (<div> Тут будет покемон фетча и когда в стейт запишем </div>) }
            {this.state.pokemon && (<div> {this.state.pokemon.name} </div>) }
        <p>RENDER!</p>
       
     <PokemonForm onSubmit = {this.handleFormSummit}/>
     <PokemonInfo pokemonName = {this.state.pokemonName} />   

    <ToastContainer autoClose={4000}/>

      </div>
    )
  }
}
export default App;
