import ProjectBar from './Project/ProjectBar';
import './App.css';
import React from 'react'
import { ENDPOINT } from './serverEndpoint.js';

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
      user:""
    }
  }
  componentDidMount=()=>{
    //fetch the details of current user using /finduserbyid/${user_id}
    // update the state of current user
    // pass the props down to ProjectBar.js 

    var uid = "60269f1055f0113dd06a4b08"
    var url = ENDPOINT + "/finduserbyid/"+uid;
    
    fetch(url)
 
    .then(data=>data.json())
    .then(data=>{
      
      if(data.length!=0)
      {
        
        this.setState({
          data:data,
          user:data,
          projects:data.projects,

        })
      }
      
    })
    .catch(err=>console.log(err))
    
   
  }



  render(){
    if(this.state.data==""){
      return(
        <div className="App">
          Loading ....
        </div>
      )
    }
    return (
      <div className="App" >
        
        <ProjectBar />
      </div>
    );
  }
}


export default App;
