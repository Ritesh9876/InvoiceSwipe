import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import InvoiceForm from './components/InvoiceForm';
import store from './reducers/store';
import { Provider } from 'react-redux';

class App extends Component {
  render() {
  return (
    <div className="App d-flex flex-column align-items-center justify-content-center w-100">
      <Provider store={store}>

      <Container>
        <InvoiceForm/>
      </Container>
      </Provider>
    </div>
  );
}}

export default App;
