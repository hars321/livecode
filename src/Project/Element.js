
import { Component } from 'react';

import './Element.css';
import ProjectBar from './ProjectBar.js';
import { useHistory } from "react-router-dom";
import { modifyUrl } from '../url';

// Parent Component is ProjectBar


// props received are :
            // index -> index of the current project in the array
            // id -> the project id 
            // name -> the peoject name
            // directories -> the directories present in the current project
            // function activeProject -> this function is responsible for changing the current active project
class Element extends Component{

  constructor(props){
    super(props)
      this.state={
        'name':'name',
        "id":'',
        'data':''
      }
      // this.goto=goto.bind(this)
    }
    truncate=(str)=>{
      if(str==undefined){
        return;
      }
      let word= str.toUpperCase();
      word=word[0];
      return word
    }

    //adds project id into the url
    goto=(e)=>{
      console.log("clicked on project",this.state.id)
      this.props.activeProject(this.state.key)
        
      // var data={
      //   "project_id":this.state.id
      // }

      // this.props.history.push('/foo');



    }
    
    componentDidMount(){
      //get base url of current website
      var base_url=window.location.origin;
      // console.log(this.props.id)
      // console.log(this.props.name)
      // console.log(this.props.data)
      //update the state
      this.setState({
        key:this.props.index,
        id:this.props.id,
        name:this.props.name,
        data:this.props.data
      })
    }
  render(){
    return (
      <div className="Element-parent" id={this.state.id} onClick={this.goto} >
        <div className="Element">
          <div className="Element-image-circle" >
            <h3 className="Element-image" >{this.truncate(this.state.name)}</h3>
          </div>
        </div>      
        
      </div>

    )
  }
}

export default Element;
