import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/header'
import List from './components/list'
import { Row, Form, Col } from 'react-bootstrap';
import axios from 'axios';


  class App extends Component {
    constructor(props){
      super(props);
      this.state = { 
        tempID: null,
        id: null,
        new: null,
        data: {
          items: [{
            quantity: 1,
            item: '',
            id: 0
          }]
        }
      }
      this.newList = this.newList.bind(this);
      this.loadList = this.loadList.bind(this);
      this.handleID = this.handleID.bind(this);
    }

    newList(){
      let newID = ('0000' + Math.floor((Math.random()*10000))).slice(-4);
      axios.get('http://localhost:5000/' + newID)
        .then((res) =>{
          console.log(res);
          if(res.data !== null) {
            this.newList();
            return;
          }
          else{
            this.setState({
              new: true,
              id: newID,
              data: {
                items: [{
                  quantity: 1,
                  item: '',
                  id: 0
                }]
              }
            });
          }
        })
    }
    
    loadList(e){
      e.preventDefault();
      axios.get('http://localhost:5000/' + this.state.tempID)
      .then((res) =>{
        console.log(res);
        if(res.data !== null) {
          console.log(res.data.items);
          this.setState({
            new: false,
            id: ('0000' + this.state.tempID).slice(-4),
            data: res.data
          });
        }
        else{
          this.setState({
            new: true,
            id: ('0000' + this.state.tempID).slice(-4),
            data: {
              items: [{
                quantity: 1,
                item: '',
                id: 0
              }]
            }
        });
        console.log(this.state.id);
      }});
      
    }
    
    handleID(event){
      this.setState({
        tempID: event.target.value
      });
      console.log(this.state.tempID);
    }


      render() { 
        let list;
        if(this.state.id !== null) list = <List key = {this.state.data} id={this.state.id} data={this.state.data}/>; 

          return ( 
            <div>
                <Header id={this.state.id} newList = {this.newList} loadList = {this.loadList} handleID = {this.handleID}/>
                {list}
            </div>
           );
      }
  }

const app = document.getElementById('root');
ReactDOM.render(<App />, app);