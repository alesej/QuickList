import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Form, Button } from 'react-bootstrap';

class ItemField extends React.Component {

    render() {
      return (
        <Form.Row className = 'mb-1'>
          <Col className= 'col-1'>
            <input type= 'number' className = 'form-control input-sm text-center' value = {this.props.quantity} onChange = {(e)=>this.props.updateQuantity(e,this.props.id)} />
          </Col>
          <Col>
            <input className = "form-control"  value = {this.props.item} onChange = {(e)=>this.props.updateText(e,this.props.id)}/>
          </Col>
          <Col xs= "auto">
            <Button variant="outline-danger" onClick = {()=>this.props.delButton(this.props.id)}>X</Button>
          </Col>
        </Form.Row>
      );
    }
  };
  
  export default ItemField;