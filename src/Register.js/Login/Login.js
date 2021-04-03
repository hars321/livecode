import React, { Component } from 'react';
import {ENDPOINT} from '../../serverEndpoint';


// Parent is Register
    // props received:
        // setUserId(user_id)
        
class Login extends Component {

    fetch_request=(data)=>{
        var post_url = ENDPOINT + "/login";
        
        fetch(post_url, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        .then(data=>data.json())
        .then(data=>{
        
            // set user_id in local_storage
            console.log(data);
            let status = data.status
            if(status == "success")
            {
                let id = data.id;

                //set user id in localstorage
                localStorage.setItem("_id", id);
            
                // update state of app.js using setUserId function
                this.props.setUserId(id);
            }
            else{
                alert("Wrong Credentials")
                console.log(data.status,data.value)
            }

      })
      .catch(err=>{
        alert("Cannot connect to the server")
      })
    }

    handleSignupClick=()=>{
        // switch to signup page
        console.log("signup click")
        this.props.changePage();
    }
    handleLoginClick=()=>{
        
        var email = this.refs.email.value;
        var password = this.refs.password.value;

        var data = {
            "email":email,
            "password":password
        }

        this.fetch_request(data);
    }
    render() {
        return (
            <div className="Form-Parent">
                <div className="Email-div Input-div">
                    <input type="email" className="email-field Input-field" placeholder="Email" ref="email"></input>
                </div>
                <div className="Password-div Input-div">
                    <input type="password" className="password-field Input-field" placeholder="Password" ref="password"></input>
                </div>

                <div className="Buttons-Div Input-div">
                    <input type="button"className="Input-field Register-Buttons inactive-button" value="Signup" onClick={this.handleSignupClick}></input>
                    <input type="button"className="Input-field Register-Buttons" value="Login" onClick={this.handleLoginClick}></input>
                </div>
                
            </div>
        );
    }
}

export default Login;