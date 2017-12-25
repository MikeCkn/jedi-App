import React, { Component } from 'react';
import axios from 'axios';

import {ListJedi, NewJedi} from './components/Jedi'
import './styles/index.css';

export default class App extends Component {

  componentWillMount() {
      this.loadJedi()
  }

  //Initialisation des states
  state = {
      data: [],
      valueInput: '',
      errorMessage: ''
  }

  //Récupère la valeur tapée dans l'input
  inputChange = (e) => {
      this.setState({
          valueInput: e.target.value
      })
  }

  //Fonction qui va gérer le cas où l'input serait vide
  handleEmptySubmit = (e) => {
      e.preventDefault()
      this.setState({
          errorMessage: 'Please add a Jedi !'
      })
  }

  //Récupère tous les jedis de la DB
  loadJedi = () => {
      axios.get('http://localhost:3009/jedi')
          .then(res => res.data)
          .then(body => {
              this.setState({
                  data: body,
                  valueInput: ''
              })
          })
  }

  //Ajoute un jedi dans la DB
  addJediToDb = (e) => {
      e.preventDefault()
      axios.post('http://localhost:3009/jedi', { id: this.state.data.index + 1, name: this.state.valueInput })
          .then(() => this.loadJedi())
            this.setState({
              errorMessage: ''
            })
  }

  //Supprime un jedi de la DB
  deleteJediToDb = (jediId) => {
      axios.delete(`http://localhost:3009/jedi/${jediId}`)
          .then(() => this.loadJedi())
  }

  render() {
    const submitHandler = this.state.valueInput ? this.addJediToDb : this.handleEmptySubmit;
    return (
      <div className="App">
        <NewJedi 
          valueInput={this.state.valueInput}
          inputChange={this.inputChange}
          addJediToDb={submitHandler}
          emptyInput={this.state.errorMessage}
        />
        <ListJedi
          data={this.state.data}
          deleteJedi={this.deleteJediToDb}
        />
      </div>
    );
  }
}