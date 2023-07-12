import React, { Component } from "react";

import Notes from "../components/Notes";
import NoteForm from "../components/NoteForm";
import LeNavBar from "../components/LeNavBar";

import { Row, Col } from "react-bootstrap";

import axiosInstance from "../config/axios.config";

export default class Home extends Component {
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

    if (response.status !== 200) {
      // commenting this until find out how to test it
      //throw new Error(body.message);

      return  { express: "error.." } ;
    }

    return body;
  };

  render() {
    const isLoggedIn = JSON.parse(
      localStorage.getItem("user")
    )?.isAuthenticated;

    return (
      <div className="App container-fluid" data-testid="home_container">
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

        {isLoggedIn ? (
          <Row>
            <Col>
              <NoteForm />
            </Col>
          </Row>
        ) : (
          ""
        )}
        <Row>
          <Notes />
        </Row>
      </div>
    );
  }
}
