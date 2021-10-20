import { Component } from 'react';
import PokemonDataView from '../PokemonDataView';
import PokemonErrorView from '../PokemonErrorView';
import PokemonPendingView from '../PokemonPendingView';
// import pokemonAPI from '../services/pokemon-api';

const Status = {
  IDLE: 'idle', // простой (стоит ничего не делает)
  PENDING: 'pending',  //ожидает
  RESOLVED: 'resolved', //выполнилось
  REJECTED: 'rejected', //отклонено
};

class PokemonInfo extends Component {

    state = {
        pokemon: null,
        loading: false,
        error: null,
        status: 'idle'
    }

componentDidUpdate (prevProps, prevState) {

    if (prevProps.pokemonName!==this.props.pokemonName) {
        console.log("Изменилось имя покемона");
        console.log("prevProps.pokemonName : ", prevProps.pokemonName);
        console.log("this.props.pokemonName : ", this.props.pokemonName);
    }
        const prevName = prevProps.pokemonName;
        const nextName = this.props.pokemonName; 

        if (prevName!==nextName) {
            this.setState ({ status: 'pending' });
            console.log("Изменилось имя покемона!");

                // this.setState ({loading: true, pokemon: null})

                setTimeout ( ()=> {  

                    fetch (`https://pokeapi.co/api/v2/pokemon/${nextName}`)
                    // .then(response=>response.json())
                    .then(response=> {
                        if (response.ok) {return response.json();}
                       
                        return Promise.reject (new Error(  `Нет покемона с именем ${nextName }` ) )
                    } )
                    .then (pokemon => this.setState({pokemon, status: 'resolved'} ))
                    .catch (error=> this.setState ({ error, status: 'rejected'  } ))
                    .finally (()=>this.setState({loading: false}))
                

                }, 1500)
                
           
        }
}

    render() {
        const { pokemon, loading, error, status} = this.state;
        const { pokemonName } = this.props;

        if (status === 'idle') {
            return <div> Введите имя покемона. </div>
        }

        if (status === 'pending') {
            // return <div> Загружаем... </div>
            return <PokemonPendingView />
        }

        if (status === 'rejected') {
            // return <h1>Всё пропоало, покемона с именем  {pokemonName}  нет! {error.message} </h1> 
       return < PokemonErrorView message = {error.message}/>
        }

        if (status === 'resolved') {
            // return (
            //         <div>
            //          <p>{pokemon.name}</p>
            //             <img 
            //                 src={pokemon.sprites.other['official-artwork'].front_default } 
            //                 alt={pokemon.name}
            //                 width="200" />
            //         </div>
            //         )

                    return (<PokemonDataView pokemon= {pokemon}/>)
        }



        // return (
        //     <div>
        //         <h1>PokemonInfo </h1>
        //           {/* <p>this.props.poke monName = {pokemonName}</p> */}
                 
        //           {/* { (error) && <h1>Всё пропоало, покемона с именем  {pokemonName}  нет!</h1>} */}
                  
        //           {/* {loading && <div> За гружаем... </div>} */}

        //           {/* {!pokemonName && <div> Введите имя покемона. </div>} */}
                   
        //           {/* {pokemon && <div> {pokemon.name}
        //            <img 
        //           src={pokemon.sprites.other['official-artwork'].front_default } 
        //           alt={pokemon.name}
        //           width="200" />
        //            </div>} */}
        //     </div>
        // )
    }


//   state = {
//     pokemon: null,
//     error: null,
//     status: Status.IDLE,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevName = prevProps.pokemonName;
//     const nextName = this.props.pokemonName;

//     if (prevName !== nextName) {
//       this.setState({ status: Status.PENDING });

//       setTimeout(() => {
//         pokemonAPI
//           .fetchPokemon(nextName)
//           .then(pokemon => this.setState({ pokemon, status: Status.RESOLVED }))
//           .catch(error => this.setState({ error, status: Status.REJECTED }));
//       }, 3000);
//     }
//   }

//   render() {
//     const { pokemon, error, status } = this.state;
//     const { pokemonName } = this.props;

//     if (status === 'idle') {
//       return <div>Введите имя покемона.</div>;
//     }

//     if (status === 'pending') {
//       return <PokemonPendingView pokemonName={pokemonName} />;
//     }

//     if (status === 'rejected') {
//       return <PokemonErrorView message={error.message} />;
//     }

//     if (status === 'resolved') {
//       return <PokemonDataView pokemon={pokemon} />;
//     }
//   }
}

export default PokemonInfo;