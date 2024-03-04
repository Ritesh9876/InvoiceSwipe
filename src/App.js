import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './common.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import InvoiceForm from './components/InvoiceForm';
import store from './reducers/store';
import { Provider } from 'react-redux';
import DisplayInvoices from './components/displayInvoices';
import EditInvoice from './components/editInvoice';
import InvoiceDetails from './components/InvoiceDetails';

class App extends Component {
  render() {
  return (
    <div 
   // className="App d-flex flex-column align-items-center justify-content-center w-100"
    >
      <Provider store={store}>

      <Router>
        <Routes>
          <Route exact path="/" element={<DisplayInvoices/>}/>
          <Route exact path="/view" element={<InvoiceDetails/>}/>
          <Route exact path="/add" element={<InvoiceForm/>}/>
          <Route exact path="/edit" element = {<EditInvoice/>}/>
        </Routes>
      </Router>
      </Provider>
    </div>
  );
}}

export default App;
