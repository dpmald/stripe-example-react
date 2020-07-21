import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Router from "next/router";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { loadStripe } from "@stripe/stripe-js";



const stripePromise = loadStripe("pk_test_51H2238Io92aJXnNLI0stj6w2KeFwXcGkyjh67PGc6pD5oeHSdxCK0oFE4ULITT9xaMl5bvNZvSxdE1JRUnSOqY1a001MKPGHuq");


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
