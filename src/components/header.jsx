import React, { Component } from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import "./header.css";

class Header extends Component {
    state = { 
     }
    render() { 
        let idField=<div></div>;
        if(this.props.id !== null) idField = <h4 className = "my-0 mx-2">ID:{this.props.id}</h4> 
        return ( 
            <Navbar className = "justify-content-between mb-1">
                <Navbar.Brand href ="#">QuickList</Navbar.Brand>
                <Form className = "navbar-right" inline onSubmit={(e) => { if (this.state.new === null || window.confirm('Are you sure you wish to load this list?')) this.props.loadList(e)}}>
                {idField}
                    <FormControl className = "mx-1 col-5 navbarTitle"  max='9999' required pattern = '\d*' maxLength='4' type = 'text' placeholder = 'Enter List ID Here' onChange = {this.props.handleID}/>
                    <Button className = "mx-1" variant='primary' type = 'submit' >Load List</Button>
                    <Button className = "mx-1" variant='primary' onClick={() => { if (this.state.new === null || window.confirm('Are you sure you wish to create a new list?')) this.props.newList()}}>New List</Button>
                </Form>
            </Navbar>
         );
    }
}
 
export default Header;