
import Monaco from './Monaco/index.js';
import ProjectBar from './Project/ProjectBar';
import './App.css';
import DirectoryBar from './Directory/DirectoryBar.js';
import React from 'react'


class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      data:""
    }
  }
  componentDidMount=()=>{
    
    fetch('http://localhost:4000/findusers')
 
    .then(data=>data.json())
    .then(data=>{
      console.log(data)
      if(data.length!=0)
      {
        this.setState({
          data:data[3]
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
        <ProjectBar data={this.state.data}/>
       
      </div>
    );
  }
}


export default App;
