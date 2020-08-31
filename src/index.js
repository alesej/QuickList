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
        if(this.state.id !== null) list = <List id={this.state.id} data={this.state.data}/>; 

          return ( 
            <div>
                <Header id={this.state.id}/>
                <Row className="justify-content-center text-center">
                  <Col className= 'justify-content-center'>
                    <button type="button" className="btn btn-primary btn-lg justify-content-center my-3" 
                    onClick={() => { if (this.state.new === null || window.confirm('Are you sure you wish to create a new list?')) this.newList()}}>New List</button>
                  </Col>
                  <Form onSubmit={(e) => { if (this.state.new === null || window.confirm('Are you sure you wish to load this list?')) this.loadList(e)}} className='input-group col'>
                    <input max= '9999' required pattern = '\d*' maxLength='4' type = 'text' className = "form-control my-auto offset-md-2 col-sm-2" placeholder = 'Enter List ID Here' onChange = {this.handleID}/>
                    <input type="submit" className="btn btn-primary btn-lg my-3 mx-1" value = "Load List"/>
                  </Form>
                </Row>
                {list}
            </div>
           );
      }
  }

const app = document.getElementById('root');
ReactDOM.render(<App />, app);