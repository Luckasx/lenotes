import React, { Component } from "react";

import Notes from "../components/Notes";
import NoteForm from "../components/NoteForm";
import LeNavBar from "../components/LeNavBar";

import { v4 as uuid } from "uuid";
import { Row, Col } from "react-bootstrap";

import axiosInstance from '../config/axios.config'

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

  callApi = async () => {
    const response = await axiosInstance.get("/api/mensagem");
    const body = await response.data;
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
        <Row>
          <Col>
            <LeNavBar />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <p className="App-intro">{this.state.response}</p>
          </Col>
        </Row>
        <Row>
          <Col>
          <NoteForm />
          </Col>
          </Row>
        <Row>
          <Notes />
        </Row>
      </div>
    );
  }
}
