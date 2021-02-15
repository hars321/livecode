import ProjectBar from './Project/ProjectBar';
import './App.css';
import React from 'react'
import { ENDPOINT } from './serverEndpoint.js';
import Register from './Register.js/Register';

// App.js 

// functionality -> fetches the details of the current user 
// we have the current user_id stored in the cookie as the jwt
// get the current user details using jwt token

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      data:"",
      projects:"",
      directory:"",
      user:"",
      id:""
    }
  }
  componentDidMount=()=>{
    //fetch the details of current user using /finduserbyid/${user_id}
    // update the state of current user
    // pass the props down to ProjectBar.js 
    var id = localStorage.getItem('_id');
    this.setState({
      id:id
    })
  }

  setUserId=(user_id)=>{
    this.setState({
      id:user_id
    })
  }

  logout=()=>{
    // delete localstorage
    localStorage.removeItem('_id');

    this.setState({
      id:""
    })
  }
  // componentDidMount(){
    
  // }
  render(){
    if(this.state.id=="" || this.state.id == undefined){
      return(
        <div className="App" >
          <Register setUserId={this.setUserId}/>
        </div>
      )
    }
    else{
      return(
        <ProjectBar logout={this.logout}/>
      )
    }
    
}
}

export default App;
