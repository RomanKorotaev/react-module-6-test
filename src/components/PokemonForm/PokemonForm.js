import { Component } from 'react';
import { ImSearch } from 'react-icons/im';

import { toast } from 'react-toastify';//// npm-пакет react для алертов, которые высвечиваются на протяжении указанного времени
import 'react-toastify/dist/ReactToastify.css'; // Обязательно подключить файл стилей, иначе Toastify заглючит


const styles = { form: { marginBottom: 20 } };

 class PokemonForm extends Component {
  state = {
    pokemonName: '',
  };

  handleNameChange = event => {
    this.setState({ pokemonName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.pokemonName.trim() === '') {
// alert ("Введите имя покемона!")
     
       toast.error("Введите имя покемона!");
      return;
    }

    this.props.onSubmit(this.state.pokemonName);
    this.setState({ pokemonName: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={styles.form}>
        <input
          type="text"
          name="pokemonName"
          value={this.state.pokemonName}
          onChange={this.handleNameChange}
        />
        <button type="submit">
          <ImSearch style={{ marginRight: 8 }} />
          Найти
        </button>
      </form>
    );
  }
}

export default  PokemonForm;