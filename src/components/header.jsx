import React, { Component } from 'react';

class Header extends Component {
    state = { 

     }
    render() { 
        let idField=<div></div>;
        if(this.props.id !== null) idField = <h3 className = "text-center offset-md-1">ID:{this.props.id}</h3> 
        return ( 
            <div className = "container-fluid align-items-center justify-content-center">
                <div className = "row justify-content-center align-items-center bg-primary">
                    <h1 className = "text-center">QuickList</h1>
                    {idField}
                </div>
            </div>
         );
    }
}
 
export default Header;