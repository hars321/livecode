
import { Component } from 'react';

import './Element.css';
import ProjectBar from './ProjectBar.js';

class Element extends Component{

  constructor(props){
    super(props)
      this.state={
        'name':'name'
      }
    }
    truncate=(str)=>{
      let word= str.toUpperCase();
      word=word[0];
      return word
    }
    componentDidMount(){
      var data=this.props.data
      var project_data=this.props.project_data
      
      var name=project_data.name
      
      this.setState({
        name:project_data.name
      })
    }
  render(){
    return (
      <div className="Element-parent">
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
