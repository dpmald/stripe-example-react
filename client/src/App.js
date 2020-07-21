import React, { Component, useState } from 'react';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm.jsx';
import styled from "@emotion/styled"
import './App.css';
import Layout from "./Layout";
import Row from "./prebuilt/Row";
import Shop from "./prebuilt/Shop";
import getPrice from "./prebuilt/GetPrice";
import TopPage from "./prebuilt/TopPage"


const stripePromise = loadStripe("pk_test_51H2238Io92aJXnNLI0stj6w2KeFwXcGkyjh67PGc6pD5oeHSdxCK0oFE4ULITT9xaMl5bvNZvSxdE1JRUnSOqY1a001MKPGHuq");

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };


  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

// test POST to server
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  render() {
    return (
      <Layout title="Feed some kittens">
        <Elements stripe={stripePromise}>
          <Row>
            <TopPage />
          </Row>
          <p>{this.state.response}</p>
        </Elements>
    </Layout>
    );
  }
}

export default App;
