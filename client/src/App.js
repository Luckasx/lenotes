import React, { Component } from "react";
import "./App.css";

import Notes from "./components/notes";
import NoteForm from "./components/note-form";

import { v4 as uuid } from "uuid";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: "",
    };
  }

  async componentDidMount() {
    let message = "";
    message = await this.callApi();

    this.setState({
      response: message.express,
    });
  }

  componentDidUpdate() {
    console.log("update", this.state.notes);
  }

  callApi = async () => {
    const response = await fetch("/api/mensagem");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  addNote = () => {
    this.setState({
      notes: this.state.notes.concat([
        {
          id: uuid(),
          task: "New task",
        },
      ]),
    });
  };

  render() {

    return (
      <div className="App container-fluid">
        <p className="App-intro">{this.state.response}</p>
        <div className="row">
          <NoteForm />
        </div>
        <div className="row">
          <Notes />
        </div>
      </div>
    );
  }
}
