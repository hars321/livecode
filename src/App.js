
import Monaco from './Monaco/index.js';
import ProjectBar from './Project/ProjectBar';
import './App.css';
import DirectoryBar from './Directory/DirectoryBar.js';
import React from 'react'
import { ENDPOINT } from './serverEndpoint.js';


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

    var url = window.location.origin
    var id=1;
    var url_parameter=`?project_id=${id}&directory=${id}&subdirectory=${id}`

    var new_url = url + url_parameter;

    
    var url = ENDPOINT + "/finduserbyid/5ff19908b3c5741086c9533c"
    // console.log(url)
    fetch(url)
 
    .then(data=>data.json())
    .then(data=>{
      console.log(data)
      if(data.length!=0)
      {
        console.log(data)
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
          Cannot load Data
        </div>
      )
    }
    return (
      <div className="App" >
        <ProjectBar />
        {/* <DirectoryBar/>
        <Monaco/>
        */}
      </div>
    );
  }
}


export default App;
