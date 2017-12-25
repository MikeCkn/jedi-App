import React, { Component } from 'react';
import axios from 'axios';

import {ListJedi, NewJedi} from './components/Jedi'
import './styles/index.css';

export default class App extends Component {

  componentWillMount() {
      this.loadJedi()
  }

  //INITIALIZE STATE
  state = {
      data: [],
      valueInput: '',
      errorMessage: ''
  }

  //GET THE INPUT VALUE
  inputChange = (e) => {
      this.setState({
          valueInput: e.target.value
      })
  }

  //CASE EMPTY INPUT
  handleEmptySubmit = (e) => {
      e.preventDefault()
      this.setState({
          errorMessage: 'Please add a Jedi !'
      })
  }

  //GET ALL JEDI FROM DB
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

  //ADD A JEDI TO DB
  addJediToDb = (e) => {
      e.preventDefault()
      axios.post('http://localhost:3009/jedi', { id: this.state.data.index + 1, name: this.state.valueInput })
          .then(() => this.loadJedi())
            this.setState({
              errorMessage: ''
            })
  }

  //DELETE A JEDI FROM DB
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