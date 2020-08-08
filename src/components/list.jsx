import React, { Component } from 'react';
import ItemField from './itemField';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Button, Row, Form, Col } from 'react-bootstrap';

class List extends Component {
    constructor(props){
        super(props);
        this.state = { 
            items : [
                { quantity: 1, 
                    item: '',
                    id: 0
                },
                
            ]
         }
         this.addItem = this.addItem.bind(this);
         this.deleteItem = this.deleteItem.bind(this);
         this.updateQuantity = this.updateQuantity.bind(this);
         this.updateText = this.updateText.bind(this);
    }

    addItem(event){
        let newItems = [...this.state.items];
        let newID = (newItems.length === 0 ? 0 : newItems[newItems.length-1].id+1)
        newItems.push({quantity: 1, item: '', id: newID})
        this.setState({
           items: newItems 
        })
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
    
    render() { 
        return ( 
            <Container className = 'container-fluid'>
                <Row className = "justify-content-center">  
                    <h3>Items:</h3>
                </Row>
                    {this.state.items.map( item => (
                        <Row key={item.id} className = "justify-content-center">
                        <Col>
                            <ItemField  
                            item={item.item} 
                            quantity={item.quantity} 
                            id = {item.id} 
                            delButton={this.deleteItem} 
                            updateQuantity = {this.updateQuantity}
                            updateText = {this.updateText}
                            />
                        </Col>
                        </Row>
                    ))}
                
                    
                <Form.Row className = 'justify-content-center'>
                    <Col className = "px-0">
                        <Button variant="outline-primary" onClick={this.addItem.bind(this)} block>New Item</Button>
                    </Col>
                    
                </Form.Row>
                
            </Container>
         );
    }
}
 
export default List;