import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/header'
import List from './components/list'

  class MainPage extends Component {
      state = {  }
      render() { 
          return ( 
              <div>
                <Header/>
                <List/>
              </div>
           );
      }
  }

const app = document.getElementById('root');
ReactDOM.render(<MainPage />, app);