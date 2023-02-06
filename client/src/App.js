import React, { Component } from "react";
import "./App.css";


import { Routes, Route } from "react-router-dom";
import Home from './views/Home'
import  Signup from './views/Signup'
import  Signin from './views/Signin'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: "",
    };
  }

  render() {

    return (
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="signup" element={<Signup />} />
      <Route path="signin" element={<Signin />} />
    </Routes>
    );
  }
}
