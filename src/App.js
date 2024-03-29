import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './common.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import store from './reducers/store';
import { Provider } from 'react-redux';
import DisplayInvoices from './components/displayInvoices';
import EditInvoice from './components/editInvoice';
import InvoiceDetails from './components/InvoiceDetails';

class App extends Component {
  render() {
  return (
    <div 
    >
      <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<DisplayInvoices/>}/>
          <Route exact path="/view" element={<InvoiceDetails/>}/>
          <Route exact path="/edit" element = {<EditInvoice/>}/>
        </Routes>
      </Router>
      </Provider>
    </div>
  );
}}

export default App;
