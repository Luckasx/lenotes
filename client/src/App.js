import React, {Component} from 'react';
import './App.css';

import Button from 'react-bootstrap/Button';

import Notes from './components/notes'

import {v4 as uuid} from 'uuid';

export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      notes: [],
      response: ''
    };
  }
 

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));

    this.getNotes()
    .then(res => this.setState({ notes: res.notes }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/mensagem');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  getNotes = async() => {

    const response = await fetch('/api/notes');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;

  }

  render() {
    
    const {notes} = this.state;

    return (
      <div className="App">
        <p className="App-intro">{this.state.response}</p>
        <Button variant="secondary" onClick={this.addNote}>+</Button>
        <Notes notes={notes}/>
      </div>
      
      
    );
  }

  addNote = () => {
 
    this.setState({
      notes: this.state.notes.concat([{
        id: uuid(),
        task: 'New task'
      }])
    });
  }
}

