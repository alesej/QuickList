import React, { Component } from 'react';
import ItemField from './itemField';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Button, Row, Form, Col } from 'react-bootstrap';
import axios from "axios";

class List extends Component {
    constructor(props){
        super(props);
        this.state = { 
            id : this.props.id,
            items : this.props.data.items
         }
         console.log(this.state.id);
         this.addItem = this.addItem.bind(this);
         this.deleteItem = this.deleteItem.bind(this);
         this.updateQuantity = this.updateQuantity.bind(this);
         this.updateText = this.updateText.bind(this);
         this.saveList = this.saveList.bind(this);
    }

    componentDidUpdate(prevProps){
        if(this.state.id !== this.props.id){
        this.setState({
            id: this.props.id,
            items: this.props.data.items
        })
        }
        if(prevProps.data !== this.props.data){
            this.setState({
                items: this.props.data.items
            })
        }

    }

    addItem(event){
        let currentFocus = document.activeElement;
        let newItems = [...this.state.items];
        let newID = (newItems.length === 0 ? 0 : newItems[newItems.length-1].id+1)
        newItems.push({quantity: 1, item: '', id: newID})
        this.setState({
           items: newItems 
        })
        //let currentFocus = document.activeElement;
        console.log(currentFocus);


    }

    deleteItem(deleteID){
        let newItems = [...this.state.items];
        newItems.splice(newItems.findIndex((e)=>e.id === deleteID),1);
        this.setState({
            items: newItems
        })
    }

    updateQuantity(event, quantID){
        let newItems = [...this.state.items];
        newItems[newItems.findIndex((e)=>e.id === quantID)].quantity = event.target.value;
        this.setState({
            items: newItems
        })
    }

    updateText(event, textID){
        let newItems = [...this.state.items];
        newItems[newItems.findIndex((e)=>e.id === textID)].item = event.target.value;
        this.setState({
            items: newItems
        })
    }
    
    saveList(){
        let response;
        axios.get('http://localhost:5000/' + this.state.id)
        .then((res) =>{response = res.data;})
        .then(() => {
            if(response === null){
                axios.post('http://localhost:5000/', this.state);
        }
            else{
                axios.put('http://localhost:5000/' + this.state.id +'/update', this.state)
    }});
    }

    deleteList(){
        let response;
        axios.delete('http://localhost:5000/' + this.state.id)
        .then((res) =>{response = res.data;})
        .then(() => {
            console.log(response);
            this.setState({items: [{
                quantity: 1,
                item: '',
                id: 0
              }]})
        });
    }

    
    render() { 
        return ( 
            <Container bg= "light" className = 'container-fluid'>
                    {this.state.items.map( item => (
                        <Row className = "mt-1">
                            <Col>
                                <ItemField  
                                item={item.item} 
                                quantity={item.quantity} 
                                id = {item.id} 
                                delButton={this.deleteItem} 
                                updateQuantity = {this.updateQuantity}
                                updateText = {this.updateText}
                                addItem = {this.addItem}
                                />
                            </Col>
                        </Row>
                    ))}
                
                    
                <Row className = 'justify-content-center'>
                    <Col>
                        <Button variant="primary my-1" onClick={this.addItem.bind(this)} block>New Item</Button>
                    </Col>
                </Row>
                <Row className = "justify-content-between">
                    <Col className='mr-auto col-auto'>
                        <Button className = 'btn-danger' onClick={() => this.deleteList()}>Delete List</Button>
                    </Col>
                    <Col className = ' col-auto'>
                        <Button className = 'btn-success justify-right' onClick={() => this.saveList()}>Save List</Button>
                    </Col>
                </Row>
            </Container>
         );
    }
}
 
export default List;