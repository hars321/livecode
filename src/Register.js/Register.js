import React, { Component } from 'react';
import Signup from './Signup/Signup';
import './Register.css';
import Login from './Login/Login';



// Parent of current component is App . js 
    // props received from app.js is : 
        // setUserId(user_id);
        // pass it down to login and signup
class Register extends Component {

    constructor(props) {
        super(props);
        this.state={
            activePage:<Login changePage={this.changePage} setUserId={this.props.setUserId}/>,
            pageType:"Login"
          }
    }
    
    changePage=()=>{
        
        if(this.state.pageType == "Login"){
            this.setState({
                activePage: <Signup changePage={this.changePage} setUserId={this.props.setUserId}/>,
                pageType: "Signup"
            })
        }
        else{
            this.setState({
                activePage: <Login changePage={this.changePage} setUserId={this.props.setUserId}/>,
                pageType: "Login"
            })
        }
    }
    render() {
        return (
            <div className="Register center">
                {this.state.activePage}
            </div>
        );
    }
}

export default Register;