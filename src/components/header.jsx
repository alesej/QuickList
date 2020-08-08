import React, { Component } from 'react';

class Header extends Component {
    state = { 

     }
    render() { 
        return ( 
            <div className = "container-fluid">
                <div className = "row justify-content-center bg-primary mb-3">
                    <h1 className = "text-center mb-4 mt-3">QuickList</h1>
                </div>
            </div>
         );
    }
}
 
export default Header;